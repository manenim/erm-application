import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotFoundException } from '@nestjs/common';
import { PermissionEnum } from 'src/auth/enums/permissions.enum';

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository: Repository<Role>;
  let permissionRepository: Repository<Permission>;

  const mockRoleRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(role => Promise.resolve({ id: '1', ...role })),
    find: jest.fn().mockResolvedValue([{ id: '1', name: 'admin', permissions: [] }]),
    findOne: jest.fn().mockImplementation(({ where: { id, name } }) => {
      if (id === '1' || name === 'admin') {
        return Promise.resolve({ id: '1', name: 'admin', permissions: [] });
      }
      return Promise.resolve(null);
    }),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockPermissionRepository = {
    find: jest.fn().mockImplementation(({ where: { name } }) => {
      const permissions = Object.values(PermissionEnum).filter(permission => name.includes(permission));
      return Promise.resolve(permissions.map(permission => ({ id: permission, name: permission })));
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getRepositoryToken(Role), useValue: mockRoleRepository },
        { provide: getRepositoryToken(Permission), useValue: mockPermissionRepository },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    permissionRepository = module.get<Repository<Permission>>(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a role', async () => {
    const createRoleDto: CreateRoleDto = { name: 'admin' };
    expect(await service.create(createRoleDto)).toEqual({
      id: '1',
      ...createRoleDto,
    });
    expect(roleRepository.create).toHaveBeenCalledWith(createRoleDto);
    expect(roleRepository.save).toHaveBeenCalledWith(createRoleDto);
  });

  it('should return all roles', async () => {
    expect(await service.findAll()).toEqual([{ id: '1', name: 'admin', permissions: [] }]);
    expect(roleRepository.find).toHaveBeenCalled();
  });

  it('should return a role by ID', async () => {
    const id = '1';
    expect(await service.findOne(id)).toEqual({ id, name: 'admin', permissions: [] });
    expect(roleRepository.findOne).toHaveBeenCalledWith({ where: { id }, relations: ['permissions'] });
  });

  it('should throw an error if role not found by ID', async () => {
    const id = '2';
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should update a role', async () => {
    const id = '1';
    const updateRoleDto: UpdateRoleDto = { name: 'superadmin' };
    expect(await service.update(id, updateRoleDto)).toEqual({
      id,
      ...updateRoleDto,
      permissions: [],
    });
    expect(roleRepository.update).toHaveBeenCalledWith(id, updateRoleDto);
    expect(roleRepository.findOne).toHaveBeenCalledWith({ where: { id }, relations: ['permissions'] });
  });

  it('should delete a role', async () => {
    const id = '1';
    await service.remove(id);
    expect(roleRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error if role not found when deleting', async () => {
    const id = '2';
    mockRoleRepository.delete.mockResolvedValueOnce({ affected: 0 });
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
  });
});