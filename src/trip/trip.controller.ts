import {
  Body,
  Controller,
  Delete,
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
import { CreateTripData } from './dto/create_trips.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import type { RequestWithUser } from '@/types/RequestWithUser';
import { UpdateTripData } from './dto/update_trips.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createTrip(
    @Body() createTripDto: CreateTripData,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user?.id;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    const contactNumber = request.user?.publicMetadata?.contactNumber as string;
    return await this.tripService.create(userId, contactNumber, createTripDto);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTrip(
    @Body() updateTripDto: UpdateTripData,
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user?.id;
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
}
