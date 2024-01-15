/*
  Warnings:

  - You are about to drop the `curso_aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NaoIniciado', 'EmAndamento', 'Finalizado', 'Aprovado');

-- DropForeignKey
ALTER TABLE "curso_aluno" DROP CONSTRAINT "curso_aluno_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "curso_aluno" DROP CONSTRAINT "curso_aluno_cursoId_fkey";

-- DropTable
DROP TABLE "curso_aluno";

-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique_curso_aluno" ON "cursos"("cursoId", "alunoId");

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
