/*
  Warnings:

  - You are about to drop the column `totalLoad` on the `Training` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Memo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Memo" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "totalLoad";
