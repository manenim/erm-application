import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data Transfer Object for creating a new role.
 */
export class CreateRoleDto {
    @ApiProperty({
        description: 'The name of the role',
        example: 'admin'
    })
    @IsString()
    name: string;
}