import { Module } from '@nestjs/common';

import { RideRequestModule } from '../ride-request/ride-request.module';
import { CheckRideRequestExpiry } from './check-ride-request-expiry.service';

@Module({
  imports: [RideRequestModule],
  controllers: [],
  providers: [CheckRideRequestExpiry],
  exports: [],
})
export class CronModule {}
