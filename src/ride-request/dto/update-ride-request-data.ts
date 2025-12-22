import { PartialType } from '@nestjs/mapped-types';
import { CreateRideRequestData } from './create-ride-request-data';

export class UpdateRideRequestData extends PartialType(CreateRideRequestData) {}
