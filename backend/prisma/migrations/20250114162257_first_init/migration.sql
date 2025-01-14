/*
  Warnings:

  - Added the required column `startTime` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
