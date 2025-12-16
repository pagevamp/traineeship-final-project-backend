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

@Module({
  imports: [
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
          console.error(
            'Invalid environment variables:',
            errors.map((err) =>
              err.constraints
                ? Object.values(err.constraints).join(', ')
                : 'Unknown validation error',
            ),
          );
          throw new Error('Invalid environment variables');
        }
        return envConfig;
      },
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
