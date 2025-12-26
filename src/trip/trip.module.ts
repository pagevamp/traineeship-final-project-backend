import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { AuthGuardModule } from '@/auth-guard/auth-guard.module';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { RideRequest } from '@/ride-request/ride-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RideRequest, Trip]), AuthGuardModule],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
