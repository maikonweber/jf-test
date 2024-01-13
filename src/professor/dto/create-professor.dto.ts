import { ApiProperty } from "@nestjs/swagger"

export class CreateProfessorDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    username: string
}
