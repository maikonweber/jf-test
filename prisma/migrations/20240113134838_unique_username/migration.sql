/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `professor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aluno_username_key" ON "aluno"("username");

-- CreateIndex
CREATE UNIQUE INDEX "professor_username_key" ON "professor"("username");
