import path from 'path';
import { createReadStream, promises } from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import puppeteer from 'puppeteer';

import { ScreenshotEntity } from './entities';

@Injectable()
export class ScreenshotService {
  constructor(
    @InjectRepository(ScreenshotEntity)
    private screenshotEntityRepository: Repository<ScreenshotEntity>,
    private configService: ConfigService,
  ) {}

  public async getScreenshotByName(res: Response, name: string) {
    const screenshotEntity = await this.screenshotEntityRepository.findOneBy({
      name,
    });
    const screenshotPath = path.resolve(process.cwd(), 'uploads', name);

    if (
      !screenshotEntity ||
      !(await promises.stat(screenshotPath).catch(() => false))
    ) {
      throw new BadRequestException(`The screenshot doesn't exist`);
    }

    const file = createReadStream(screenshotPath);

    file.pipe(res);
  }

  public async takeScreenshot(
    packageId: number,
    packageName: string,
    qr?: QueryRunner,
  ) {
    const browser = await puppeteer.launch({
      ...(this.configService.get('NODE_ENV') === 'production' && {
        executablePath: '/usr/bin/google-chrome',
      }),
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const imageName = `${uuid()}.jpg`;

    await page.goto(
      `https://play.google.com/store/apps/details?id=${packageName}`,
    );
    await page.screenshot({
      type: 'jpeg',
      path: `uploads/${imageName}`,
      fullPage: true,
    });
    await browser.close();

    const screenshotEntity = new ScreenshotEntity();

    screenshotEntity.name = imageName;
    screenshotEntity.packageId = packageId;

    if (qr) {
      await qr.manager.save(screenshotEntity);
    } else {
      await this.screenshotEntityRepository.save(screenshotEntity);
    }
  }
}
