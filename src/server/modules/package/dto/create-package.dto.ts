import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreatePackageDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public readonly name!: string;
}
