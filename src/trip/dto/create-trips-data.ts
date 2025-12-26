import { VehicleType } from '@/types/trips';
import { IsEnum, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsUUID()
  readonly requestId: string;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  @MaxLength(255)
  readonly vehicleType: VehicleType;
}
