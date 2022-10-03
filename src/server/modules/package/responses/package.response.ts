import { Exclude, Expose } from 'class-transformer';

import { ScreenshotEntity } from '../../screenshot';

@Exclude()
export class PackageResponse {
  @Expose()
  public readonly id!: number;

  @Expose()
  public readonly name!: string;

  @Expose()
  public readonly createdAt!: string;

  @Expose()
  public readonly screenshots!: ScreenshotEntity[];
}
