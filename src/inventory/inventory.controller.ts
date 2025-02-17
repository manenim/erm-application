import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Inventory (Can only be accessed by inventory managers and Admins)')
@Roles(RoleEnum.ADMIN, RoleEnum.INVENTORY_MANAGER)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @ApiOperation({ summary: 'Create a new inventory record' })
  @ApiResponse({ status: 201, description: 'The inventory record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @ApiOperation({ summary: 'Get all inventory records' })
  @ApiResponse({ status: 200, description: 'Return all inventory records.' })
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @ApiOperation({ summary: 'Get an inventory record by ID' })
  @ApiResponse({ status: 200, description: 'Return the inventory record.' })
  @ApiResponse({ status: 404, description: 'Inventory record not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an inventory record' })
  @ApiResponse({ status: 200, description: 'The inventory record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Inventory record not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @ApiOperation({ summary: 'Delete an inventory record' })
  @ApiResponse({ status: 200, description: 'The inventory record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Inventory record not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}