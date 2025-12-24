/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { Trip } from '../entities/trip.entity';
import { IsObject, IsPhoneNumber, IsString, IsUrl, MaxLength, ValidateNested } from 'class-validator';

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

export class GetTripsByDriverResponseDto extends Trip{
    @IsObject()
    @ValidateNested()
    @Type(()=>Driver)
    readonly driver : Driver
    
}