import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) { }

  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'The role has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles.' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiResponse({ status: 200, description: 'Return the role.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: 'Assign permissions to a role' })
  @ApiResponse({ status: 200, description: 'The permissions have been successfully assigned.' })
  @ApiResponse({ status: 404, description: 'Role or permissions not found.' })
  @Post(':id/permissions')
  async assignPermissions(@Param('id') id: string, @Body() assignPermissionsDto: AssignPermissionsDto) {
    return this.roleService.assignPermissions(id, assignPermissionsDto.permissionNames);
  }

  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({ status: 200, description: 'The role has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({ status: 200, description: 'The role has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }


}