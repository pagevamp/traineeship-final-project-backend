import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto, TripStatus } from './dto/create-trips.dto';
import { UpdateTripData } from './dto/update-trips.dto';
import type { ClerkClient } from '@clerk/backend';
import { getStringMetadata } from '@/utils/clerk.utils';
import { GetTripsByDriverResponseDto } from './dto/get-trips-by-driver.dto';
import { RideAcceptedEvent } from '@/event/ride-accepted-event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getDateRangeCeiling, getDateRangeFloor } from '@/utils/date-range';
import { RideRequest } from '@/ride-request/ride-request.entity';

@Injectable()
export class TripService {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(RideRequest)
    private readonly rideRequestRepository: Repository<RideRequest>,
  ) {}

  // to create a new trip when a user accepts a ride request
  async create(userId: string, createTripDto: CreateTripDto): Promise<Trip> {
    const existingTrips = await this.tripRepository.find({
      where: { driverId: userId },
      relations: ['ride'],
    });

    const ride = await this.rideRequestRepository.findOne({
      where: { id: createTripDto.requestId },
    });

    if (!ride) {
      throw new NotFoundException('Ride request not found');
    }

    if (ride.acceptedAt === undefined) {
      throw new ConflictException('acceptedAt field undefined');
    }

    const newStartTime = getDateRangeFloor(ride.departureTime);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const newEndTime = getDateRangeCeiling(ride.departureTime);

    for (const existingTrip of existingTrips) {
      if (!existingTrip.ride) continue;
      const existingStart = getDateRangeFloor(existingTrip.ride.departureTime);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const existingEnd = getDateRangeCeiling(existingTrip.ride.departureTime);

      if (newStartTime < existingEnd && newEndTime > existingStart) {
        throw new ConflictException('Clashing trip time range');
      }
    }

    const trip = this.tripRepository.create({
      driverId: userId,
      ride,
      status: TripStatus.NOT_STARTED,
      vehicleType: createTripDto.vehicleType,
    });

    const event = new RideAcceptedEvent(ride.id, ride.acceptedAt);
    this.eventEmitter.emit('ride.updated', event);

    return await this.tripRepository.save(trip);
  }

  // to update the ride status from the drivers end
  // only for the rides they have accepted
  async update(
    id: string,
    userId: string,
    updateTripData: UpdateTripData,
  ): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['ride'],
    });
    if (!trip) {
      throw new NotFoundException(`Trip: ${id} not found`);
    }

    if (userId !== trip.driverId) {
      throw new ConflictException(`Can only update your trips`);
    }

    if (getDateRangeFloor(trip.ride.departureTime) > new Date()) {
      throw new ConflictException(`Trip cannot be updated now`);
    }

    Object.assign(trip, updateTripData);
    return await this.tripRepository.save(trip);
  }

  // to cancel the accepted trip from the drivers end
  // only for the rides they have accepted
  async cancelTrip(id: string, userId: string) {
    const trip = await this.tripRepository.findOne({
      where: { id, driverId: userId },
      relations: ['ride'],
    });
    if (!trip) {
      throw new NotFoundException(`Trip: ${id} not found`);
    }
    if (userId !== trip.driverId) {
      throw new ConflictException(`Can only delete your trips`);
    }
    if (getDateRangeFloor(trip.ride.departureTime) > new Date()) {
      throw new ConflictException(`Trip cannot be updated now`);
    }

    await this.tripRepository.softDelete(id);
  }

  // to get all the pending trips for a particular user
  async getPendingTrips(
    driverId: string,
  ): Promise<{ message: string; trips: GetTripsByDriverResponseDto[] }> {
    const trips = await this.tripRepository.find({
      where: { status: TripStatus.NOT_STARTED, driverId },
    });
    if (trips.length === 0) {
      throw new NotFoundException(`No Pending Trips`);
    }
    const driver = await this.clerkClient.users.getUser(driverId);
    const mappedTrips = trips.map((trip) => ({
      ...trip,
      driver: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        profileImage: driver.imageUrl,
        phoneNumber: getStringMetadata(driver, 'contactNumber'),
        primaryLocation: getStringMetadata(driver, 'primaryLocation'),
      },
    }));

    return {
      message: 'Driver Details fetched successfully',
      trips: mappedTrips,
    };
  }

  // to get all the trips for a particular user
  // to be able to view the trips history of the user
  async getAllTripsById(
    driverId: string,
  ): Promise<{ message: string; trips: GetTripsByDriverResponseDto[] }> {
    const trips = await this.tripRepository.find({
      where: { driverId },
    });
    if (trips.length === 0) {
      throw new NotFoundException(`No Trips Found`);
    }

    const driver = await this.clerkClient.users.getUser(driverId);
    const mappedTrips = trips.map((trip) => ({
      ...trip,
      driver: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        profileImage: driver.imageUrl,
        phoneNumber: getStringMetadata(driver, 'contactNumber'),
        primaryLocation: getStringMetadata(driver, 'primaryLocation'),
      },
    }));
    return {
      message: 'Driver Details fetched successfully',
      trips: mappedTrips,
    };
  }

  // to get all the trips details of the driver that accepts the ride
  async getAcceptedTripById(
    driverId: string,
    id: string,
  ): Promise<{ message: string; trips: any }> {
    const trips = await this.tripRepository.findOne({
      where: { driverId, ride: { id } },
    });
    if (!trips) {
      throw new NotFoundException(`No Trips Found`);
    }

    const driver = await this.clerkClient.users.getUser(driverId);
    const tripDetails = {
      trips,
      driver: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        profileImage: driver.imageUrl,
        phoneNumber: getStringMetadata(driver, 'contactNumber'),
        primaryLocation: getStringMetadata(driver, 'primaryLocation'),
      },
    };
    return {
      message: 'Driver Details fetched successfully',
      trips: tripDetails,
    };
  }
}
