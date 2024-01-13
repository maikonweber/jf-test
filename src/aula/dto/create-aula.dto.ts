import { ApiProperty } from "@nestjs/swagger"

export class CreateAulaDto {
    @ApiProperty()
    curso_id: number
    @ApiProperty()
    content: string
}
