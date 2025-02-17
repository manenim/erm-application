// src/auth/role.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
// import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';
// import { RolesGuard } from './roles.guard';
// import { Permissions } from './permissions.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) { }

  @Post()
  // @Permissions('create:role') // Example permission
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  // @Permissions('read:role')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  // @Permissions('read:role')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  // @Permissions('update:role')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  // @Permissions('delete:role')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Post(':id/permissions') // Assign permissions to a role
  // @Permissions('update:role')
  async assignPermissions(@Param('id') id: string, @Body() permissionIds: number[]) {
    return this.roleService.assignPermissions(id, permissionIds);
  }
}
