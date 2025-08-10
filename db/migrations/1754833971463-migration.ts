import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754833971463 implements MigrationInterface {
    name = 'Migration1754833971463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('sale', 'purchase')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "priceId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."prices_type_enum" AS ENUM('sale', 'purchase')`);
        await queryRunner.query(`CREATE TABLE "prices" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "type" "public"."prices_type_enum" NOT NULL, "active" boolean NOT NULL DEFAULT true, "productId" integer, CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d9316e9ae87b7654891cdb6ff4b" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prices" ADD CONSTRAINT "FK_fe932c923ecd4abc3f0ac915736" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "prices" DROP CONSTRAINT "FK_fe932c923ecd4abc3f0ac915736"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d9316e9ae87b7654891cdb6ff4b"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "prices"`);
        await queryRunner.query(`DROP TYPE "public"."prices_type_enum"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
    }

}
