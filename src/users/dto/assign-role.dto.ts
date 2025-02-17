import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/auth/enums/role.enum";

/**
 * Data Transfer Object for assigning a role to a user.
 */

export class AssignRoleDto {
    @ApiProperty({
        description: 'The role to be assigned to the user',
        enum: RoleEnum,
        example: RoleEnum.ADMIN
    })
    @IsEnum(RoleEnum)
    roleName: RoleEnum;
}