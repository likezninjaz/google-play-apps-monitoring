import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';

import { ScreenshotService } from './screenshot.service';
import { ScreenshotNameParamsDto } from './dto';

@Controller('screenshots')
export class ScreenshotController {
  constructor(private readonly screenshotService: ScreenshotService) {}

  @Get(':name')
  public async getScreenshotByName(
    @Param() screenshotNameParamsDto: ScreenshotNameParamsDto,
    @Res() res: Response,
  ) {
    return this.screenshotService.getScreenshotByName(
      res,
      screenshotNameParamsDto.name,
    );
  }
}
