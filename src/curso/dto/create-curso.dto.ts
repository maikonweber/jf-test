import { ApiProperty } from "@nestjs/swagger"

export class CreateCursoDto {
    @ApiProperty()
    nome: string
    @ApiProperty()
    description: string
    @ApiProperty()
    banner: string
}
