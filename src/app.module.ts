import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@/core/core.module';
import dataSource from './data-source';
import { plainToInstance } from 'class-transformer';
import { EnvConfig } from '@/config/env.validation';
import { validateSync } from 'class-validator';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardModule } from './auth-guard/auth-guard.module';
import { RideRequestModule } from './ride-request/ride-request.module';
import { TripModule } from './trip/trip.module';
import { ClerkClientProvider } from './providers/clerk.provider';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(dataSource.options),
    CoreModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const envConfig = plainToInstance(EnvConfig, env, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(envConfig, {
          skipMissingProperties: false,
        });

        if (errors.length > 0) {
          throw new Error('Invalid environment variables');
        }
        return envConfig;
      },
    }),
    AuthGuardModule,
    RideRequestModule,
    TripModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    ClerkClientProvider,
  ],
})
export class AppModule {}
