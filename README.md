
## Description

O projeto:

Você foi contratado para desenvolver o back-end de um sistema de cadastramento de cursos online, esse sistema possui dois tipos de acesso:

Professor (Nome, usuário)
Aluno (Nome, usuário)

[x] O sistema permite que o PROFESSOR cadastre novos cursos (Nome, descrição, banner).
[x] Apenas o PROFESSOR pode criar,  editar, ou excluir cursos.
[x] O professor pode liberar ou remover acesso para determinados alunos ou todos a algum curso.

[x] O curso é formado por uma ou mais aulas, cada aula pode conter:
Um texto ou um arquivo (pdf, xlsx, docx, pptx) ou um link.

[x]  O professor consegue ver todos os alunos com acesso ao curso e quantas aulas do total eles visualizaram.
[x] O professor pode aprovar um aluno, CONTANTO QUE esse aluno tenha assistido a 100% das aulas daquele curso.

[x] O aluno consegue apenas visualizar os cursos e aulas e somente dos cursos aos quais ele tiver sido cadastrado.
[x] Cada aula que o aluno visualiza é registrada no sistema vinculada ao seu usuário.

[x] O aluno consegue ver seu status no curso:
[x] Não iniciado:  quando tem 0 aulas visualizadas
[x] Em andamento: quando tem ao menos uma aula visualizada
[x] Finalizado: Quando tem 100% das aulas visualizadas, porém sem aprovação do professor
[x] Aprovado: Quando o professor aprova

[x] Um aluno não consegue ver os cursos, aulas, e nem dados de outros alunos. Apenas os próprios.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

