import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, CreateBulkPermissionsDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let service: PermissionsService;

  const mockPermissionsService = {
    create: jest.fn(dto => {
      return {
        id: '1',
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: '1',
          name: 'view_employee_records',
        },
      ];
    }),
    findOne: jest.fn(id => {
      return {
        id,
        name: 'view_employee_records',
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn(id => {
      return {
        id,
      };
    }),
    bulkCreate: jest.fn(names => {
      return names.map((name, index) => ({
        id: (index + 1).toString(),
        name,
      }));
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: mockPermissionsService,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    service = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a permission', async () => {
    const createPermissionDto: CreatePermissionDto = { name: 'view_employee_records' };
    expect(await controller.create(createPermissionDto)).toEqual({
      id: '1',
      ...createPermissionDto,
    });
    expect(service.create).toHaveBeenCalledWith(createPermissionDto);
  });

  it('should return all permissions', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: '1',
        name: 'view_employee_records',
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a permission by ID', async () => {
    const id = '1';
    expect(await controller.findOne(id)).toEqual({
      id,
      name: 'view_employee_records',
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a permission', async () => {
    const id = '1';
    const updatePermissionDto: UpdatePermissionDto = { name: 'edit_employee_records' };
    expect(await controller.update(id, updatePermissionDto)).toEqual({
      id,
      ...updatePermissionDto,
    });
    expect(service.update).toHaveBeenCalledWith(id, updatePermissionDto);
  });

  it('should delete a permission', async () => {
    const id = '1';
    expect(await controller.remove(id)).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('should bulk create permissions', async () => {
    const bulkCreateDto: CreateBulkPermissionsDto = {
      names: ['view_employee_records', 'edit_employee_records'],
    };
    expect(await controller.bulkCreate(bulkCreateDto)).toEqual([
      { id: '1', name: 'view_employee_records' },
      { id: '2', name: 'edit_employee_records' },
    ]);
    expect(service.bulkCreate).toHaveBeenCalledWith(bulkCreateDto.names);
  });
});