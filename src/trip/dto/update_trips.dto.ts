import { PartialType } from '@nestjs/mapped-types';
import { CreateTripData } from './create_trips.dto';

export class UpdateTripData extends PartialType(CreateTripData) {}
