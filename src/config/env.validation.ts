import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class EnvConfig {
  @IsString()
  DB_HOST: string;

  @Type(() => Number)
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @Type(() => Number)
  @IsNumber()
  PORT: number;

  @IsString()
  NODE_ENV: string;

  @IsString()
  CLERK_PUBLISHABLE_KEY: string;

  @IsString()
  CLERK_SECRET_KEY: string;
}
