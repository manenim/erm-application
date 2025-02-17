

import { IsArray, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreatePermissionDto {
    @ApiProperty({
        description: 'The name of the role',
        example: 'view_employee_records'
    })
    @IsString()
    name: string;
}


export class CreateBulkPermissionsDto {
    @ApiProperty({
        description: 'Array of permission names',
        example: ['view_employee_records', 'edit_employee_records', 'delete_employee_records']
    })
    @IsArray()
    @IsString({ each: true })
    names: string[];
}
