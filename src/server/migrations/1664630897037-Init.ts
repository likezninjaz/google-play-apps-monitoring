import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Init1664630897037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'packages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            default: 'now()',
            isNullable: false,
            name: 'created_at',
            type: 'timestamp with time zone',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'screenshots',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'package_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['package_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'packages',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('packages', true);
    await queryRunner.dropTable('screenshots', true);
  }
}
