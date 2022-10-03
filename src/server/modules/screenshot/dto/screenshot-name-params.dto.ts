import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ScreenshotNameParamsDto {
  @Expose()
  public readonly name!: string;
}
