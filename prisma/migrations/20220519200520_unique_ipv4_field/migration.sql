/*
  Warnings:

  - A unique constraint covering the columns `[ipv4Address]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Visitor_ipv4Address_key` ON `Visitor`(`ipv4Address`);
