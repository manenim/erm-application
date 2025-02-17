import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Finance (Can only be accessed by finance managers and Admins)')
@Roles(RoleEnum.ADMIN, RoleEnum.FINANCE_MANAGER)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) { }

  @ApiOperation({ summary: 'Create a new finance record' })
  @ApiResponse({ status: 201, description: 'The finance record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financeService.create(createFinanceDto);
  }

  @ApiOperation({ summary: 'Get all finance records' })
  @ApiResponse({ status: 200, description: 'Return all finance records.' })
  @Get()
  findAll() {
    return this.financeService.findAll();
  }

  @ApiOperation({ summary: 'Get a finance record by ID' })
  @ApiResponse({ status: 200, description: 'Return the finance record.' })
  @ApiResponse({ status: 404, description: 'Finance record not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a finance record' })
  @ApiResponse({ status: 200, description: 'The finance record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Finance record not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financeService.update(+id, updateFinanceDto);
  }

  @ApiOperation({ summary: 'Delete a finance record' })
  @ApiResponse({ status: 200, description: 'The finance record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Finance record not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financeService.remove(+id);
  }
}