import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trips.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import type { RequestWithUser } from '@/types/RequestWithUser';
import { UpdateTripData } from './dto/update-trips.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createTrip(
    @Body() createTripDto: CreateTripDto,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.decodedData.id;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return await this.tripService.create(userId, createTripDto);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTrip(
    @Body() updateTripDto: UpdateTripData,
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.decodedData.id;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return await this.tripService.update(userId, updateTripDto);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async cancelTrip(@Param('id') id: string) {
    await this.tripService.cancelTrip(id);
    return { message: 'Trip deleted successfully' };
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getPendingTrips(@Req() request: RequestWithUser) {
    const driverId = request.decodedData.id;

    if (!driverId) {
      throw new NotFoundException('Trips for User not found');
    }
    const trips = await this.tripService.getPendingTrips(driverId);
    return {
      message: 'Pending trips',
      data: { trips },
    };
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllTripsById(@Req() request: RequestWithUser) {
    const driverId = request.decodedData.id;
    if (!driverId) {
      throw new NotFoundException('Trips for User not found');
    }
    const trips = await this.tripService.getAllTripsById(driverId);
    return {
      message: 'User related trips',
      data: { trips },
    };
  }
}
