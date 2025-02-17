

import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreatePermissionDto {
    @ApiProperty({
        description: 'The name of the role',
        example: 'view_employee_records'
    })
    @IsString()
    name: string;
}
