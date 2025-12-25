/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { Trip } from '../entities/trip.entity';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { PassengerData } from '@/ride-request/dto/get-ride-response-data';

export class Driver {
  @IsString()
  @MaxLength(255)
  readonly firstName?: string | null;

  @IsString()
  @MaxLength(255)
  readonly lastName?: string | null;

  @IsPhoneNumber()
  @MaxLength(255)
  readonly phoneNumber?: string | null;

  @IsUrl()
  @MaxLength(255)
  readonly profileImage?: string | null;

  @IsString()
  @MaxLength(255)
  readonly primaryLocation?: string | null;
}

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
