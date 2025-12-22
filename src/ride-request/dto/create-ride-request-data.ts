import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinDate,
} from 'class-validator';

export class CreateRideRequestData {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly destination: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly landmark?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly pickupLocation: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  readonly notes?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), {
    message: 'Departure start time must be in the future',
  })
  readonly departureStart: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), { message: 'Departure end time must be in the future' })
  readonly departureEnd: Date;
}
