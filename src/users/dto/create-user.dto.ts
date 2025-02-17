import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Data Transfer Object for creating a new user.
 */

export class CreateUserDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John'
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe'
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com'
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'securepassword123'
    })
    @IsString()
    password: string;
}