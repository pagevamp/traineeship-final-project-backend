export class RideCancelledEvent {
  constructor(
    public readonly requestId: string,
    public readonly acceptedAt?: Date | null,
  ) {}
}
