import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import type { ClerkClient } from '@clerk/backend';
import { getPassengersForTrips, getStringMetadata } from '@/utils/clerk.utils';
import { RideAcceptedEvent } from '@/event/ride-accepted-event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getDateRangeCeiling } from '@/utils/date-range';
import { RideRequest } from '@/ride-request/ride-request.entity';
import { CreateTripDto } from './dto/create-trips-data';
import { UpdateTripDto } from './dto/update-trips-data';
import { GetTripsByDriverResponseDto } from './dto/get-trips-by-driver-data';
import { TripStatus } from '@/types/trips';

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
      where: { driverId: userId, status: Not(TripStatus.REACHED_DESTINATION) },
    });

    // check if any incomplete trips left
    if (completedTrips.length > 0) {
      throw new ConflictException('Complete Pending Rides First');
    }

    const ride = await this.rideRequestRepository.findOne({
      where: { id: createTripDto.requestId },
    });

    if (!ride) {
      throw new NotFoundException('Ride request not found');
    }

    if (ride?.passengerId === userId) {
      throw new ConflictException('Cannot accept own ride-request');
    }

    if (getDateRangeCeiling(ride.departureTime) < new Date()) {
      throw new ForbiddenException(`Trip cannot be accepted now`);
    }

    const trip = this.tripRepository.create({
      driverId: userId,
      ride,
      status: TripStatus.NOT_STARTED,
      vehicleType: createTripDto.vehicleType,
    });

    //event triggered when a user accepts a ride
    const event = new RideAcceptedEvent(ride.id, new Date());
    this.eventEmitter.emit('ride.accepted', event);

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
      throw new ForbiddenException(`Can only update your own trips`);
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
      throw new ForbiddenException(`Can only delete your trips`);
    }
    //to check is ride has expired
    if (getDateRangeCeiling(trip.ride.departureTime) < new Date()) {
      throw new ForbiddenException(`Trip cannot be deleted now`);
    }

    await this.tripRepository.softDelete(id);
  }

  // to get all the pending trips for a particular user
  async getPendingTrips(
    driverId: string,
  ): Promise<{ trips: GetTripsByDriverResponseDto[] }> {
    const trips = await this.tripRepository.find({
      where: { status: TripStatus.NOT_STARTED, driverId },
      relations: ['ride'],
    });
    if (!trips.length) {
      throw new NotFoundException(`No Pending Trips`);
    }
    const driver = await this.clerkClient.users.getUser(driverId);

    //to batch fetch all the passengers for the trips
    const passengerMap = await getPassengersForTrips(trips, this.clerkClient);

    //to attach each of the trips with the driver information
    const mappedTrips = trips.map((trip) => {
      const passenger = passengerMap.get(trip.ride.passengerId);

      return {
        ...trip,
        driver: {
          firstName: driver.firstName,
          lastName: driver.lastName,
          phoneNumber: getStringMetadata(driver, 'contactNumber'),
        },
        passenger: {
          firstName: passenger?.firstName,
          lastName: passenger?.lastName,
          phoneNumber: passenger?.phoneNumber,
          profileImage: passenger?.profileImage,
        },
      };
    });

    return {
      trips: mappedTrips,
    };
  }

  // to get all the trips for a particular user
  // to be able to view the trips history of the user
  async getAllTripsById(
    driverId: string,
  ): Promise<{ trips: GetTripsByDriverResponseDto[] }> {
    const trips = await this.tripRepository.find({
      where: { driverId },
      relations: ['ride'],
    });
    if (!trips.length) {
      throw new NotFoundException(`No Trips Found`);
    }

    const driver = await this.clerkClient.users.getUser(driverId);

    //to batch fetch all the passengers for the trips
    const passengerMap = await getPassengersForTrips(trips, this.clerkClient);

    //to attach each of the trips with the driver and passenger information
    const mappedTrips = trips.map((trip) => {
      const passenger = passengerMap.get(trip.ride.passengerId);

      return {
        ...trip,
        driver: {
          firstName: driver.firstName,
          lastName: driver.lastName,
          profileImage: driver.imageUrl,
          phoneNumber: getStringMetadata(driver, 'contactNumber'),
          primaryLocation: getStringMetadata(driver, 'primaryLocation'),
        },
        passenger: {
          firstName: passenger?.firstName,
          lastName: passenger?.lastName,
          phoneNumber: passenger?.phoneNumber,
          profileImage: passenger?.profileImage,
        },
      };
    });
    return {
      trips: mappedTrips,
    };
  }

  // to get all the trips details of the driver that accepts the ride
  // the ride requester can get this when their ride is accepted
  async getAcceptedTripById(id: string) {
    const trip = await this.tripRepository.findOne({
      where: { ride: { passengerId: id } },
    });
    if (!trip) {
      throw new NotFoundException(`No Accepting Trip Found`);
    }

    const driver = await this.clerkClient.users.getUser(trip.driverId);
    //to get the details of the ride-accepting user(driver)

    return {
      ...trip,
      driver: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        profileImage: driver.imageUrl,
        phoneNumber: getStringMetadata(driver, 'contactNumber'),
        primaryLocation: getStringMetadata(driver, 'primaryLocation'),
      },
    };
  }
}
