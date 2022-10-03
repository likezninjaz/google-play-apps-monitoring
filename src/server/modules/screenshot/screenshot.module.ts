import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreenshotEntity } from './entities';
import { ScreenshotController } from './screenshot.controller';
import { ScreenshotService } from './screenshot.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenshotEntity])],
  providers: [ScreenshotService],
  controllers: [ScreenshotController],
  exports: [TypeOrmModule, ScreenshotService],
})
export class ScreenshotModule {}
