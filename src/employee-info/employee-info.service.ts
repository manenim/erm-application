import { Injectable } from '@nestjs/common';
import { CreateEmployeeInfoDto } from './dto/create-employee-info.dto';
import { UpdateEmployeeInfoDto } from './dto/update-employee-info.dto';

@Injectable()
export class EmployeeInfoService {
  create(createEmployeeInfoDto: CreateEmployeeInfoDto) {
    return 'This action adds a new employeeInfo';
  }

  findAll() {
    return `This action returns all employeeInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeInfo`;
  }

  update(id: number, updateEmployeeInfoDto: UpdateEmployeeInfoDto) {
    return `This action updates a #${id} employeeInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeInfo`;
  }
}
