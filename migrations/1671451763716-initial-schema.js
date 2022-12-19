const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1671451763716 {
    name = 'initialSchema1671451763716'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_report"("id", "price") SELECT "id", "price" FROM "report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password") SELECT "id", "email", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password") SELECT "id", "email", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_report"("id", "price") SELECT "id", "price" FROM "report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
        await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_report"("id", "price", "approved", "make", "model", "year", "lng", "lat", "mileage", "userId") SELECT "id", "price", "approved", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "report"("id", "price", "approved", "make", "model", "year", "lng", "lat", "mileage", "userId") SELECT "id", "price", "approved", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "temporary_report"`);
        await queryRunner.query(`DROP TABLE "temporary_report"`);
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "report"("id", "price") SELECT "id", "price" FROM "temporary_report"`);
        await queryRunner.query(`DROP TABLE "temporary_report"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password") SELECT "id", "email", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password") SELECT "id", "email", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "report"("id", "price") SELECT "id", "price" FROM "temporary_report"`);
        await queryRunner.query(`DROP TABLE "temporary_report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
