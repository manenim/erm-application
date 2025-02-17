import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { RoleEnum } from 'src/auth/enums/role.enum';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const mockRolesService = {
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
          name: 'admin',
        },
      ];
    }),
    findOne: jest.fn(id => {
      return {
        id,
        name: 'admin',
      };
    }),
    assignPermissions: jest.fn((id, permissionNames) => {
      return {
        id,
        permissionNames,
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a role', async () => {
    const createRoleDto: CreateRoleDto = { name: 'admin' };
    expect(await controller.create(createRoleDto)).toEqual({
      id: '1',
      ...createRoleDto,
    });
    expect(service.create).toHaveBeenCalledWith(createRoleDto);
  });

  it('should return all roles', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: '1',
        name: 'admin',
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a role by ID', async () => {
    const id = '1';
    expect(await controller.findOne(id)).toEqual({
      id,
      name: 'admin',
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  

  it('should update a role', async () => {
    const id = '1';
    const updateRoleDto: UpdateRoleDto = { name: 'superadmin' };
    expect(await controller.update(id, updateRoleDto)).toEqual({
      id,
      ...updateRoleDto,
    });
    expect(service.update).toHaveBeenCalledWith(id, updateRoleDto);
  });

  it('should delete a role', async () => {
    const id = '1';
    expect(await controller.remove(id)).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});