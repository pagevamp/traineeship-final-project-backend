import { ClerkClient, User } from '@clerk/backend';
import type { Trip } from '@/trip/entities/trip.entity';
import { PassengerData } from '@/ride-request/dto/get-ride-response-data';

export function getStringMetadata(user: User, key: string): string | null {
  const value = user.publicMetadata?.[key];
  return typeof value === 'string' ? value : null;
}

export async function getPassengersForTrips(
  trips: Trip[],
  clerkClient: ClerkClient,
): Promise<Map<string, PassengerData>> {
  const passengerIds = [...new Set(trips.map((trip) => trip.ride.passengerId))];

  const passengers = await Promise.all(
    passengerIds.map((id) => clerkClient.users.getUser(id)),
  );

  return new Map(passengers.map((passenger) => [passenger.id, passenger]));
}
