import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RideRequest } from './ride-request.entity';
import { IsNull, Repository } from 'typeorm';
import type { ClerkClient } from '@clerk/backend';
import { CreateRideRequestData } from './dto/create-ride-request-data';
import { UpdateRideRequestData } from './dto/update-ride-request-data';
import { GetRideResponseData } from './dto/get-ride-response-data';
import { getStringMetadata } from '@/utils/clerk.utils';
import { OnEvent } from '@nestjs/event-emitter';
import { RideAcceptedEvent } from '@/event/ride-accepted-event';
import { getDateRangeFloor } from '@/utils/date-range';
import { Trip } from '@/trip/entities/trip.entity';
import { TripStatus } from '@/types/trips';

@Injectable()
export class RideRequestService {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    @InjectRepository(RideRequest)
    private readonly rideRequestRepository: Repository<RideRequest>,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  private validateDepartureGap(start: Date, end: Date): void {
    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = diffMs / (1000 * 60);

    if (diffMinutes <= 0) {
      throw new ConflictException(
        'Departure end time must be after departure start time',
      );
    }

    if (diffMinutes > 60) {
      throw new ConflictException(
        'Departure time gap cannot be more than 1 hour',
      );
    }
  }

  //event listener for when a user accepts a ride
  @OnEvent('ride.accepted')
  async updateAcceptedAt(event: RideAcceptedEvent) {
    const requestId = event.requestId;
    const acceptedTime = event.acceptedAt;

    const ride = await this.rideRequestRepository.findOneBy({ id: requestId });

    if (!acceptedTime) {
      throw new ConflictException('No acceptedAt date/time');
    }

    if (!ride) {
      throw new NotFoundException('No such ride request');
    }

    if (getDateRangeFloor(ride.departureTime) < new Date()) {
      throw new ConflictException('Ride cannot be updated now');
    }

    await this.rideRequestRepository.update(
      { id: requestId },
      { acceptedAt: acceptedTime },
    );
  }

  async create(
    userId: string,
    createRideRequestData: CreateRideRequestData,
  ): Promise<RideRequest> {
    const pendingRequest = await this.rideRequestRepository.findOne({
      where: {
        passengerId: userId,
        acceptedAt: IsNull(),
      },
    });

    if (pendingRequest) {
      throw new ConflictException(
        'Please cancel your previous ride request before requesting a new ride',
      );
    }

    const activeRide = await this.tripRepository.findOne({
      where: {
        ride: { passengerId: userId },
      },
      relations: ['ride'],
    });

    if (activeRide && activeRide?.status !== TripStatus.REACHED_DESTINATION)
      throw new ConflictException(
        'Please complete your pending rides or cancel it to request a new ride',
      );

    this.validateDepartureGap(
      new Date(createRideRequestData.departureStart.toISOString()),
      new Date(createRideRequestData.departureEnd.toISOString()),
    );

    const departureRange = `[${createRideRequestData.departureStart.toISOString()}, ${createRideRequestData.departureEnd.toISOString()}]`;
    const rideRequest = this.rideRequestRepository.create({
      passengerId: userId,
      destination: createRideRequestData.destination,
      landmark: createRideRequestData.landmark,
      pickupLocation: createRideRequestData.pickupLocation,
      notes: createRideRequestData.notes,
      departureTime: departureRange,
    });

    return await this.rideRequestRepository.save(rideRequest);
  }

  async update(
    userId: string,
    request_id: string,
    updateRideRequestData: UpdateRideRequestData,
  ): Promise<{ message: string }> {
    if (!request_id) {
      throw new BadRequestException('Request id is required');
    }

    const existingRideRequest = await this.rideRequestRepository.findOne({
      where: {
        id: request_id,
        passengerId: userId,
      },
    });

    if (!existingRideRequest) {
      throw new NotFoundException(
        `Ride request with ID ${request_id} not found`,
      );
    }

    if (existingRideRequest.acceptedAt) {
      throw new ConflictException('Accepted rides cannot be edited');
    }

    const { departureStart, departureEnd, ...otherPayload } =
      updateRideRequestData;

    if (
      (departureStart && !departureEnd) ||
      (!departureStart && departureEnd)
    ) {
      throw new BadRequestException(
        'Both departureStart and departureEnd must be provided together',
      );
    }

    const updatedPayload = { ...otherPayload };
    let departureTimeRange = existingRideRequest.departureTime;
    if (departureStart && departureEnd) {
      this.validateDepartureGap(
        new Date(departureStart.toISOString()),
        new Date(departureEnd.toISOString()),
      );
      departureTimeRange = `[${departureStart.toISOString()}, ${departureEnd.toISOString()}]`;
    }

    const result = await this.rideRequestRepository.update(
      {
        id: request_id,
        passengerId: userId,
        acceptedAt: IsNull(),
      },
      {
        ...updatedPayload,
        departureTime: departureTimeRange,
      },
    );

    if (result.affected === 0) {
      throw new ConflictException(
        'Could not update ride request, the ride may have already been accepted or cancelled.',
      );
    }
    return { message: 'Ride request has been updated successfully' };
  }

  async delete(
    userId: string,
    request_id: string,
  ): Promise<{ message: string }> {
    if (!request_id) {
      throw new BadRequestException('Request id is required');
    }

    const existingRideRequest = await this.rideRequestRepository.findOne({
      where: {
        id: request_id,
        passengerId: userId,
      },
    });

    if (!existingRideRequest) {
      throw new NotFoundException(
        `Ride request with ID ${request_id} not found`,
      );
    }

    await this.rideRequestRepository.softDelete({
      id: request_id,
      passengerId: userId,
    });

    return { message: 'Ride request has been cancelled successfully' };
  }

  async getById(
    userId: string,
    request_id: string,
  ): Promise<{ message: string; ride: GetRideResponseData }> {
    if (!request_id) {
      throw new BadRequestException('Request id is required');
    }

    const ride = await this.rideRequestRepository.findOne({
      where: {
        id: request_id,
        passengerId: userId,
      },
      withDeleted: true,
    });

    if (!ride) {
      throw new NotFoundException(
        `Ride request with ID ${request_id} not found`,
      );
    }

    const user = await this.clerkClient.users.getUser(ride.passengerId);

    return {
      message: 'Ride request has been fetched successfully',
      ride: {
        ...ride,
        passenger: {
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.imageUrl,
          phoneNumber: getStringMetadata(user, 'contactNumber'),
        },
      },
    };
  }

  //to get all the ride or individual user
  async getAllByUserId(
    userId: string,
  ): Promise<{ message: string; rides: GetRideResponseData[] }> {
    const rides = await this.rideRequestRepository.find({
      where: { passengerId: userId },
      withDeleted: true,
    });

    const user = await this.clerkClient.users.getUser(userId);

    const formattedRides = rides.map((ride) => ({
      ...ride,
      passenger: {
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.imageUrl,
        phoneNumber: getStringMetadata(user, 'contactNumber'),
      },
    }));

    return {
      message: 'Ride requests have been fetched successfully',
      rides: formattedRides,
    };
  }

  // to fetch all the pending ride request for riders/drivers
  async getAll(): Promise<{
    message: string;
    rides: GetRideResponseData[];
  }> {
    const rides = await this.rideRequestRepository.find({
      where: { acceptedAt: IsNull() },
      withDeleted: true,
    });

    const passengerIds = [...new Set(rides.map((ride) => ride.passengerId))];

    const users = await Promise.all(
      passengerIds.map((id) => this.clerkClient.users.getUser(id)),
    );

    const userMap = new Map(users.map((user) => [user.id, user]));

    const formattedRides = rides.flatMap((ride) => {
      const user = userMap.get(ride.passengerId);
      if (!user) return [];
      return {
        ...ride,
        passenger: {
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.imageUrl,
          phoneNumber: getStringMetadata(user, 'contactNumber'),
        },
      };
    });
    return {
      message: 'Ride requests have been fetched successfully',
      rides: formattedRides,
    };
  }

  async getExpiredRideRequests() {
    const now = new Date();

    return (await this.rideRequestRepository.find()).filter(
      (ride) => getDateRangeFloor(ride.departureTime) < now,
    );
  }

  async deleteExpiredRequests(
    request_id: string,
  ): Promise<{ message: string }> {
    if (!request_id) {
      throw new BadRequestException('Request id is required');
    }

    const existingRideRequest = await this.rideRequestRepository.findOne({
      where: {
        id: request_id,
      },
    });

    if (!existingRideRequest) {
      throw new NotFoundException(
        `Ride request with ID ${request_id} not found`,
      );
    }

    await this.rideRequestRepository.softDelete({
      id: request_id,
    });

    return { message: 'Ride request has been deleted successfully' };
  }
}
