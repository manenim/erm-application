import { IsEnum, IsString } from "class-validator";
import { RoleEnum } from "src/auth/enums/role.enum";


export class AssignRoleDto {

    @IsEnum(RoleEnum)
    roleName: RoleEnum;
}