import { Module } from '@nestjs/common';
import { RideRequestController } from './ride-request.controller';
import { RideRequestService } from './ride-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideRequest } from './ride-request.entity';
import { AuthGuardModule } from '@/auth-guard/auth-guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([RideRequest]), AuthGuardModule],
  controllers: [RideRequestController],
  providers: [RideRequestService],
  exports: [RideRequestService],
})
export class RideRequestModule {}
