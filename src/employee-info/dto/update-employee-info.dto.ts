import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeInfoDto } from './create-employee-info.dto';

export class UpdateEmployeeInfoDto extends PartialType(CreateEmployeeInfoDto) {}
