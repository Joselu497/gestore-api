import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755470119669 implements MigrationInterface {
    name = 'Migration1755470119669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d9316e9ae87b7654891cdb6ff4b"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "priceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prices" DROP CONSTRAINT "FK_fe932c923ecd4abc3f0ac915736"`);
        await queryRunner.query(`ALTER TABLE "prices" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d9316e9ae87b7654891cdb6ff4b" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices" ADD CONSTRAINT "FK_fe932c923ecd4abc3f0ac915736" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "prices" DROP CONSTRAINT "FK_fe932c923ecd4abc3f0ac915736"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d9316e9ae87b7654891cdb6ff4b"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prices" ADD CONSTRAINT "FK_fe932c923ecd4abc3f0ac915736" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "priceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d9316e9ae87b7654891cdb6ff4b" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
