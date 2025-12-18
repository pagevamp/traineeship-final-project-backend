import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RideRequest } from './ride-request.entity';
import { Repository } from 'typeorm';
import { CreateRideRequestData } from './dto/create-ride-request-data';
import { UpdateRideRequestData } from './dto/update-ride-request-data';

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

    const { departureStart, departureEnd, ...otherPayload } =
      updateRideRequestData;

    const updatedPayload = { ...otherPayload };
    let currentRange = existingRideRequest.departureTime;
    if (departureStart && departureEnd) {
      if (departureStart > departureEnd) {
        throw new BadRequestException('Start time must be before end time');
      }
      currentRange = `[${departureStart.toISOString()}, ${departureEnd.toISOString()}]`;
    }

    const result = await this.rideRequestRepository
      .createQueryBuilder()
      .update(RideRequest)
      .set({
        ...updatedPayload,
        departureTime: currentRange,
      })
      .where('id = :id', { id: request_id })
      .andWhere('isAccepted = false')
      .execute();

    if (result.affected === 0) {
      throw new ConflictException(
        'Could not update ride request, the ride may have already been accepted or cancelled.',
      );
    }
    return { message: 'Ride request has been updated successfully' };
  }
}
