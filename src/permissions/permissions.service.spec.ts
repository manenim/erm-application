import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let repository: Repository<Permission>;

  const mockPermissionsRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(permission => Promise.resolve({ id: '1', ...permission })),
    find: jest.fn().mockResolvedValue([{ id: '1', name: 'view_employee_records' }]),
    findOne: jest.fn().mockImplementation(({ where: { id, name } }) => {
      if (id === '1' || name === 'view_employee_records') {
        return Promise.resolve({ id: '1', name: 'view_employee_records' });
      }
      return Promise.resolve(null);
    }),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        { provide: getRepositoryToken(Permission), useValue: mockPermissionsRepository },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    repository = module.get<Repository<Permission>>(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a permission', async () => {
    const createPermissionDto: CreatePermissionDto = { name: 'view_employee_records' };
    expect(await service.create(createPermissionDto)).toEqual({
      id: '1',
      ...createPermissionDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createPermissionDto);
    expect(repository.save).toHaveBeenCalledWith(createPermissionDto);
  });

  it('should bulk create permissions', async () => {
    const permissionNames = ['view_employee_records', 'edit_employee_records'];
    expect(await service.bulkCreate(permissionNames)).toEqual([
      { id: '1', name: 'view_employee_records' },
      { id: '2', name: 'edit_employee_records' },
    ]);
    expect(repository.create).toHaveBeenCalledTimes(permissionNames.length);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should return all permissions', async () => {
    expect(await service.findAll()).toEqual([{ id: '1', name: 'view_employee_records' }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a permission by ID', async () => {
    const id = '1';
    expect(await service.findOne(id)).toEqual({ id, name: 'view_employee_records' });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should throw an error if permission not found by ID', async () => {
    const id = '2';
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should return a permission by name', async () => {
    const name = 'view_employee_records';
    expect(await service.findOneByName(name)).toEqual({ id: '1', name });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { name } });
  });

  it('should throw an error if permission not found by name', async () => {
    const name = 'non_existent_permission';
    await expect(service.findOneByName(name)).rejects.toThrow(NotFoundException);
  });

  it('should update a permission', async () => {
    const id = '1';
    const updatePermissionDto: UpdatePermissionDto = { name: 'edit_employee_records' };
    expect(await service.update(id, updatePermissionDto)).toEqual({
      id,
      ...updatePermissionDto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, updatePermissionDto);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should delete a permission', async () => {
    const id = '1';
    await service.remove(id);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error if permission not found when deleting', async () => {
    const id = '2';
    mockPermissionsRepository.delete.mockResolvedValueOnce({ affected: 0 });
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
  });
});