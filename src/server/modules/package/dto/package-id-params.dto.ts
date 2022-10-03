import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class PackageIdParamsDto {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  public readonly packageId!: number;
}
