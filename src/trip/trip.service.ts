import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripData, TripStatus } from './dto/create_trips.dto';
import { UpdateTripData } from './dto/update_trips.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async create(
    userId: string,
    contactNumber: string,
    createTripData: CreateTripData,
  ): Promise<Trip> {
    const trip = this.tripRepository.create({
      driverId: userId,
      contactNumber: contactNumber,
      requestId: createTripData.requestId,
      status: TripStatus.NOT_STARTED,
      vehicleType: createTripData.vehicleType,
    });

    return await this.tripRepository.save(trip);
  }

  async update(id: string, updateTripData: UpdateTripData): Promise<Trip> {
    const trip = await this.tripRepository.findOneBy({ id });
    if (!trip) {
      throw new NotFoundException(`Trip: ${id} not found`);
    }

    Object.assign(trip, updateTripData);
    return await this.tripRepository.save(trip);
  }

  async cancelTrip(id: string) {
    const trip = await this.tripRepository.findOneBy({ id });
    if (!trip) {
      throw new NotFoundException(`Trip: ${id} not found`);
    }

    await this.tripRepository.softDelete(id);
  }
}
