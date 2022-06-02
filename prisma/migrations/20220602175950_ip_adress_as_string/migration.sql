/*
  Warnings:

  - You are about to drop the column `ipv4Address` on the `Visitor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ipAddress]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ipAddress` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Visitor_ipv4Address_key` ON `Visitor`;

-- AlterTable
ALTER TABLE `Visitor` DROP COLUMN `ipv4Address`,
    ADD COLUMN `ipAddress` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Visitor_ipAddress_key` ON `Visitor`(`ipAddress`);
