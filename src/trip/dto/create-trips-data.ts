import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

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
  @MaxLength(255)
  readonly requestId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly status: TripStatus;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly vehicleType: VehicleType;
}
