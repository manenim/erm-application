import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from 'src/permissions/entities/permission.entity';
import { PermissionEnum } from 'src/auth/enums/permissions.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission) 
    private permissionRepository: Repository<Permission>,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['permissions'] }); // Eager load permissions
  }
  
  async findOneByRoleName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { name }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  


  assignPermissions = async (roleId: string, permissionNames: PermissionEnum[]) => {
    const role = await this.findOne(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    const permissions = await this.permissionRepository.find({ where: { name: In(permissionNames) } });
    if (permissions.length !== permissionNames.length) {
      throw new NotFoundException('Some permissions were not found');
    }
    role.permissions = permissions;
    return this.rolesRepository.save(role);
  }



  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.rolesRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}