/*
  Warnings:

  - You are about to drop the column `aluno` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `aluno` on the `professor` table. All the data in the column will be lost.
  - Added the required column `username` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "aluno",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "professor" DROP COLUMN "aluno",
ADD COLUMN     "username" TEXT NOT NULL;
