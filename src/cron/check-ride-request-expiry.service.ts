import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RideRequestService } from '../ride-request/ride-request.service';

@Injectable()
export class CheckRideRequestExpiry {
  constructor(private readonly rideRequestService: RideRequestService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkExpiredRideRequest() {
    const expiredRideRequests =
      await this.rideRequestService.getExpiredRideRequests();
    for (const ride of expiredRideRequests) {
      await this.rideRequestService.deleteExpiredRequests(ride.id);
    }
  }
}
