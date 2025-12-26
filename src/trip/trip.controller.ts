import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import type { RequestWithUser } from '@/types/RequestWithUser';
import { CreateTripDto } from './dto/create-trips-data';
import { UpdateTripDto } from './dto/update-trips-data';

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
    return await this.tripService.create(userId, createTripDto);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTrip(
    @Body() updateTripDto: UpdateTripDto,
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.decodedData.id;
    return await this.tripService.update(id, userId, updateTripDto);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async cancelTrip(@Param('id') id: string, @Req() request: RequestWithUser) {
    const userId = request.decodedData.id;
    await this.tripService.cancelTrip(id, userId);
    return { message: 'Trip deleted successfully' };
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Get('/pending')
  async getPendingTrips(@Req() request: RequestWithUser) {
    const driverId = request.decodedData.id;
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
    const trips = await this.tripService.getAllTripsById(driverId);
    return {
      message: 'User related trips',
      data: { trips },
    };
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Get('/accepted')
  async getAcceptedTripById(@Req() request: RequestWithUser) {
    const passengerId = request.decodedData.id;
    const id = passengerId;
    const trips = await this.tripService.getAcceptedTripById(id);
    return {
      message: 'User related trips',
      data: { trips },
    };
  }
}
