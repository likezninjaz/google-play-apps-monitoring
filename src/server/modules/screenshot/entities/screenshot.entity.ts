import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PackageEntity } from '../../package';

@Entity('screenshots')
export class ScreenshotEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id!: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public name!: string;

  @Column({
    name: 'package_id',
    type: 'int',
    nullable: false,
  })
  @ManyToOne(() => PackageEntity, (p) => p.screenshots)
  @JoinColumn({
    name: 'package_id',
    referencedColumnName: 'id',
  })
  public packageId!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  readonly createdAt!: Date;
}
