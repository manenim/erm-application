import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
// postgresql://mani:M2ogc94pfn5p4yLbNG0MCwanVuJCbxcd@dpg-cupepupu0jms73bm4asg-a.oregon-postgres.render.com/ermdb_1bp9
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'dpg-cupepupu0jms73bm4asg-a.oregon-postgres.render.com',
        port: 5432,
        username: 'mani',
        password: 'M2ogc94pfn5p4yLbNG0MCwanVuJCbxcd',
        database: "ermdb_1bp9",
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false
        }
    }),
    inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
