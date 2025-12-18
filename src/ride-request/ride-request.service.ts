import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RideRequest } from './ride-request.entity';
import { Repository } from 'typeorm';
import { CreateRideRequestData } from './dto/create-ride-request-data';

@Injectable()
export class RideRequestService {
  constructor(
    @InjectRepository(RideRequest)
    private readonly rideRequestRepository: Repository<RideRequest>,
  ) {}

  async create(
    userId: string,
    createRideRequestData: CreateRideRequestData,
  ): Promise<RideRequest> {
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
}
