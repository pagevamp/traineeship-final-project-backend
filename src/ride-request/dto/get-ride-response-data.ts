import {
  IsString,
  IsOptional,
  ValidateNested,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RideRequest } from '../ride-request.entity';
class PassengerData {
  @IsString()
  @IsOptional()
  firstName?: string | null;

  @IsString()
  @IsOptional()
  lastName?: string | null;

  @IsString()
  @IsOptional()
  phoneNumber?: string | null;

  @IsString()
  @IsOptional()
  profileImage?: string | null;
}

export class GetRideResponseData extends RideRequest {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PassengerData)
  readonly passenger: PassengerData;
}
