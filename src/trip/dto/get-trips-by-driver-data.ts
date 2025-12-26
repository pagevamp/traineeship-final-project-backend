import { Type } from 'class-transformer';
import { Trip } from '../entities/trip.entity';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PassengerData } from '@/ride-request/dto/get-ride-response-data';
import { Driver } from '@/trip/dto/get-driver-data';

export class GetTripsByDriverResponseDto extends Trip {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Driver)
  readonly driver: Driver;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PassengerData)
  readonly passenger: PassengerData;
}
