import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RideRequestService } from './ride-request.service';
// import { CreateRideRequestData } from './dto/create-ride-request-data';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import { CreateRideRequestData } from './dto/create-ride-request-data';
import type { RequestWithUser } from '@/types/RequestWithUser';
import { UpdateRideRequestData } from './dto/update-ride-request-data';
// import type { RequestWithUser } from '@/types/RequestWithUser';
// import { UpdateRideRequestData } from './dto/update-ride-request-data';

@Controller('ride-request')
export class RideRequestController {
  constructor(private readonly rideRequestService: RideRequestService) {}

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRideRequest(
    @Body() body: CreateRideRequestData,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.rideRequestService.create(userId, body);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  async updateRideRequest(
    @Body() body: UpdateRideRequestData,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.rideRequestService.update(userId, id, body);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Delete(':id')
  async deleteRideRequest(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.rideRequestService.delete(userId, id);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Get('my-rides')
  async getAllRidesByUserId(@Req() request: RequestWithUser) {
    const userId = request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.rideRequestService.getAllByUserId(userId);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Get(':id')
  async getRideById(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const userId = request.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.rideRequestService.getById(userId, id);
  }

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Get()
  async getAllRides() {
    return await this.rideRequestService.getAll();
  }
}
