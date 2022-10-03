import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreenshotModule } from '../screenshot';

import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { PackageEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity]), ScreenshotModule],
  providers: [PackageService],
  controllers: [PackageController],
  exports: [TypeOrmModule, PackageService],
})
export class PackageModule {}
