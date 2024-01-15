/*
  Warnings:

  - Added the required column `cursoId` to the `aula_aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aula_aluno" ADD COLUMN     "cursoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "aula_aluno" ADD CONSTRAINT "aula_aluno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
