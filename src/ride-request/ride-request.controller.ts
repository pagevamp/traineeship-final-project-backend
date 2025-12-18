import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RideRequestService } from './ride-request.service';
import { CreateRideRequestData } from './dto/create-ride-request-data';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import type { RequestWithUser } from '@/types/RequestWithUser';

@Controller('ride-request')
export class RideRequestController {
  constructor(private readonly rideRequestService: RideRequestService) {}

  @UseGuards(AuthGuardService)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUrl(
    @Body() body: CreateRideRequestData,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user?.id;
    return await this.rideRequestService.create(userId!, body);
  }
}
