import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeInfoService } from './employee-info.service';
import { CreateEmployeeInfoDto } from './dto/create-employee-info.dto';
import { UpdateEmployeeInfoDto } from './dto/update-employee-info.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Employee-info (Can only be accessed by HR_Managers and Admins)')
@Roles(RoleEnum.ADMIN, RoleEnum.HR_MANAGER)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('employee-info')
export class EmployeeInfoController {
  constructor(private readonly employeeInfoService: EmployeeInfoService) { }

  @ApiOperation({ summary: 'Create a new employee info record' })
  @ApiResponse({ status: 201, description: 'The employee info record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createEmployeeInfoDto: CreateEmployeeInfoDto) {
    return this.employeeInfoService.create(createEmployeeInfoDto);
  }

  @ApiOperation({ summary: 'Get all employee info records' })
  @ApiResponse({ status: 200, description: 'Return all employee info records.' })
  @Get()
  findAll() {
    return this.employeeInfoService.findAll();
  }

  @ApiOperation({ summary: 'Get an employee info record by ID' })
  @ApiResponse({ status: 200, description: 'Return the employee info record.' })
  @ApiResponse({ status: 404, description: 'Employee info record not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeInfoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an employee info record' })
  @ApiResponse({ status: 200, description: 'The employee info record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Employee info record not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeInfoDto: UpdateEmployeeInfoDto) {
    return this.employeeInfoService.update(+id, updateEmployeeInfoDto);
  }

  @ApiOperation({ summary: 'Delete an employee info record' })
  @ApiResponse({ status: 200, description: 'The employee info record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Employee info record not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeInfoService.remove(+id);
  }
}