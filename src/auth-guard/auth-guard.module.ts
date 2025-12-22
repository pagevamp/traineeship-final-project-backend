import { ClerkClientProvider } from '@/providers/clerk.provider';
import { Module } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';

@Module({
  providers: [AuthGuardService, ClerkClientProvider],
  exports: ['ClerkClient'],
})
export class AuthGuardModule {}
