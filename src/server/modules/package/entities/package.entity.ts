import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ScreenshotEntity } from '../../screenshot';

@Entity('packages', {
  orderBy: {
    createdAt: 'DESC',
  },
})
export class PackageEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id!: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public name!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    precision: 3,
  })
  public readonly createdAt!: Date;

  @OneToMany(() => ScreenshotEntity, (s) => s.packageId, { eager: true })
  public readonly screenshots!: ScreenshotEntity[];
}
