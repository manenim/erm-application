import { Module } from '@nestjs/common';
import { EmployeeInfoService } from './employee-info.service';
import { EmployeeInfoController } from './employee-info.controller';

@Module({
  controllers: [EmployeeInfoController],
  providers: [EmployeeInfoService],
})
export class EmployeeInfoModule {}
