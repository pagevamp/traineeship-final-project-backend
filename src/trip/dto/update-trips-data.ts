import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trips-data';

export class UpdateTripDto extends PartialType(CreateTripDto) {}
