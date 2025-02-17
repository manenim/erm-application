import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Role, (role) => role.users, { eager: true }) // Many-to-many with Role
    @JoinTable() 
    roles: Role[] // Default role of 'user'

}
