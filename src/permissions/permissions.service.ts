import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBulkPermissionsDto, CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) { }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionsRepository.create(createPermissionDto);
    try {
      return await this.permissionsRepository.save(permission);
    } catch (error) {
      if (error.code === '23505') { 
        throw new BadRequestException('Permission name already exists.');
      }
      throw error; 
    }
  }

  async bulkCreate(permissionNames: string[]): Promise<Permission[]> {
    const permissions = permissionNames.map(name => this.permissionsRepository.create({ name }));
    try {
      return await this.permissionsRepository.save(permissions);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Permission name already exists.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find(); 
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async findOneByName(name: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({ where: { name } });
    if (!permission) {
      throw new NotFoundException(`Permission with name ${name} not found`);
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    try {
      await this.permissionsRepository.update(id, updatePermissionDto);
      return this.findOne(id); 
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Permission name already exists.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.permissionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }
}
