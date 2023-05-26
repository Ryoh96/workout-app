-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_placeId_fkey";

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "placeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
