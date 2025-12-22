import { RideRequest } from '../ride-request.entity';

export class GetRideResponseData extends RideRequest {
  passenger: {
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    profileImage: string | null;
  };
}
