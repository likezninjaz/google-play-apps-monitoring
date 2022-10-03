import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PackageService } from './package.service';
import { CreatePackageDto, PackageIdParamsDto } from './dto';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  public async getPackageList() {
    return this.packageService.getPackageList();
  }

  @Get(':packageId')
  public async getPackageById(@Param() packageIdParamsDto: PackageIdParamsDto) {
    return this.packageService.getPackageById(packageIdParamsDto.packageId);
  }

  @Post()
  public async addPackage(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.addPackage(createPackageDto);
  }
}
