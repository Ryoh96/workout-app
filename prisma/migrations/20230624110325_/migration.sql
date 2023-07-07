/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "order" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Todo";
