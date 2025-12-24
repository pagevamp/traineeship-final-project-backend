import { Trip } from '../entities/trip.entity';

export class GetTripsByDriverResponseDto extends Trip {
  driver: {
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    profileImage: string | null;
    primaryLocation: string | null;
  };
}
