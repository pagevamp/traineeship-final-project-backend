/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { Trip } from '../entities/trip.entity';
import { IsObject, IsPhoneNumber, IsString, IsUrl, MaxLength, ValidateNested } from 'class-validator';

export class Driver {
  @IsString()
  @MaxLength(255)
  firstName?: string | null;

  @IsString()
  @MaxLength(255)
  lastName?: string | null;

  @IsPhoneNumber()
  @MaxLength(255)
  phoneNumber?: string | null;

  @IsUrl()
  @MaxLength(255)
  profileImage?: string | null;

  @IsString()
  @MaxLength(255)
  primaryLocation?: string | null;
}

export class GetTripsByDriverResponseDto extends Trip{
    @IsObject()
    @ValidateNested()
    @Type(()=>Driver)
    driver : Driver
    
}