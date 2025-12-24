import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import type { ClerkClient } from '@clerk/backend';
import { getStringMetadata } from '@/utils/clerk.utils';
import { RideAcceptedEvent } from '@/event/ride-accepted-event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getDateRangeFloor } from '@/utils/date-range';
import { RideRequest } from '@/ride-request/ride-request.entity';
import { CreateTripDto, TripStatus } from './dto/create-trips-data';
import { UpdateTripDto } from './dto/update-trips-data';
import { GetTripsByDriverResponseDto } from './dto/get-trips-by-driver-data';

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
    const completedTrips = await this.tripRepository.find({
      where: { driverId: userId, status: TripStatus.REACHED_DESTINATION },
    });

    const allTrips = await this.tripRepository.find({
      where: { driverId: userId },
    });

    if (allTrips.length > completedTrips.length) {
      throw new NotFoundException('Complete Pending Rides First');
    }

    const ride = await this.rideRequestRepository.findOne({
      where: { id: createTripDto.requestId },
    });

    if (!ride) {
      throw new NotFoundException('Ride request not found');
    }

    if (ride.acceptedAt === undefined) {
      throw new ConflictException('acceptedAt field undefined');
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
    updateTripData: UpdateTripDto,
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

    if (getDateRangeFloor(trip.ride.departureTime) < new Date()) {
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
    if (getDateRangeFloor(trip.ride.departureTime) < new Date()) {
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
  // the ride requester can get this when their ride is accepted
  async getAcceptedTripById(
    requestId: string,
  ): Promise<{ message: string; trips: any }> {
    const trips = await this.tripRepository.findOne({
      where: { ride: { id: requestId } },
    });
    if (!trips) {
      throw new NotFoundException(`No Trips Found`);
    }

    const driver = await this.clerkClient.users.getUser(trips.driverId);
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
