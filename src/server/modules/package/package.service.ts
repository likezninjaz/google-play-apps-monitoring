import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';

import { ScreenshotService } from '../screenshot';

import { PackageEntity } from './entities';
import { CreatePackageDto } from './dto';
import { PackageResponse } from './responses';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(PackageEntity)
    private packageRepository: Repository<PackageEntity>,
    private screenshotService: ScreenshotService,
  ) {}

  public async getPackageList() {
    const packageEntities = await this.packageRepository.find();

    return plainToInstance(PackageResponse, packageEntities);
  }

  public async getPackageById(id: number) {
    const packageEntity = await this.packageRepository.findOneBy({ id });

    if (!packageEntity) {
      throw new BadRequestException(`The package doesn't exist`);
    }

    return plainToInstance(PackageResponse, packageEntity);
  }

  public async addPackage({ name }: CreatePackageDto) {
    const packageEntity = await this.packageRepository.findOneBy({ name });

    if (packageEntity) {
      throw new BadRequestException('The package already exists');
    }

    const qr = this.packageRepository.manager.connection.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();

    try {
      const packageEntity = new PackageEntity();

      packageEntity.name = name;

      await qr.manager.save(packageEntity);
      await this.screenshotService.takeScreenshot(packageEntity.id, name, qr);

      await qr.commitTransaction();

      return this.getPackageById(packageEntity.id);
    } catch (e) {
      if (qr.isTransactionActive) await qr.rollbackTransaction();
      throw e;
    } finally {
      if (!qr.isReleased) await qr.release();
    }
  }

  @Cron('30 * * * * *')
  public async updatePackageScreenshots() {
    const stream = await this.packageRepository
      .createQueryBuilder('p')
      .stream();

    for await (const { p_id: id, p_name: name } of stream) {
      await this.screenshotService.takeScreenshot(id, name);
    }
  }
}
