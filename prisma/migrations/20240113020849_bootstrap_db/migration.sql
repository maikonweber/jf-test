-- CreateTable
CREATE TABLE "professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "aluno" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "aluno" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "banner" TEXT NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aula" (
    "id" SERIAL NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aula_aluno" (
    "id" SERIAL NOT NULL,
    "aulaId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "progresso" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aula_aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_aluno" (
    "id" SERIAL NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique_aula_aluno" ON "aula_aluno"("aulaId", "alunoId");

-- CreateIndex
CREATE INDEX "unique_curso_aluno" ON "curso_aluno"("cursoId", "alunoId");

-- AddForeignKey
ALTER TABLE "aula" ADD CONSTRAINT "aula_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aula_aluno" ADD CONSTRAINT "aula_aluno_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aula_aluno" ADD CONSTRAINT "aula_aluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_aluno" ADD CONSTRAINT "curso_aluno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_aluno" ADD CONSTRAINT "curso_aluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
