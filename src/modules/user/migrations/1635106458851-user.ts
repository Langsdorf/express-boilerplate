import { MigrationInterface, QueryRunner } from "typeorm";

export class user1635106458851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(1);
    await queryRunner.query(
      `CREATE TABLE user2 (id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user2`);
  }
}
