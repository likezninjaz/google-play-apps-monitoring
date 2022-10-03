import path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { ExceptionFilter } from './filters';
import { PackageModule, ScreenshotModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        entities: ['dist/server/**/*.entity{ .ts,.js}'],
        migrations: ['dist/server/migrations/*{.ts,.js}'],
        migrationsRun: true,
        synchronize: false,
        keepConnectionAlive: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        ...(configService.get('NODE_ENV') === 'production'
          ? [
              {
                rootPath: path.resolve(process.cwd(), 'dist', 'client'),
                exclude: ['/api*'],
              },
            ]
          : []),
      ],
      inject: [ConfigService],
    }),
    PackageModule,
    ScreenshotModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
