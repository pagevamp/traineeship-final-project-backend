import { IsEnum, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export enum TripStatus {
  NOT_STARTED = 'Not Started',
  ON_THE_WAY = 'On The Way',
  REACHED_DESTINATION = 'Reached Destination',
  REACHED_PICKUP = 'Reached Pickup',
}

export enum VehicleType {
  TWO_WHEELER = 'Two Wheeler',
  FOUR_WHEELER = 'Four Wheeler',
}

export class CreateTripDto {
  @IsNotEmpty()
  @IsUUID()
  readonly requestId: string;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  @MaxLength(255)
  readonly vehicleType: VehicleType;
}
