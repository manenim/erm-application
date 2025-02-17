import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import the User entity
import { Permission } from 'src/permissions/entities/permission.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true }) // Many-to-many with Permission
    @JoinTable()
    permissions: Permission[];

    @ManyToMany(() => User, (user) => user.roles) // Many-to-many with User
    users: User[];

  
}
