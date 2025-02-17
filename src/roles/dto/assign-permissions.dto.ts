import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { PermissionEnum } from 'src/auth/enums/permissions.enum';


export class AssignPermissionsDto {
    @ApiProperty({ enum: PermissionEnum, isArray: true })
    @IsArray()
    @IsEnum(PermissionEnum, { each: true })
    permissionNames: PermissionEnum[];
}