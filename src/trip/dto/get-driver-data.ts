import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class Driver {
  @IsString()
  @MaxLength(255)
  readonly firstName?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly lastName?: string | null;

  @IsPhoneNumber()
  @IsOptional()
  @MaxLength(255)
  readonly phoneNumber?: string | null;

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  readonly profileImage?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly primaryLocation?: string | null;
}
