export class RideAcceptedEvent {
  constructor(
    public readonly requestId: string,
    public readonly acceptedAt?: Date | null,
  ) {}
}
