import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../../products/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text',{
    select:  false // se pone para que no aparezca en el find ya que e un dato sensible 
  })
  password: string;

  @Column('text')
  fullName:string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],// para que cuando se qcree solo quede uno por defecto user
  })
  roles: string[];


  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
    eager: true, //para que me ponga las relaciones de la tabla
  })
  products: Product;

  @BeforeInsert()
  checkUserInsert() {
    this.email = this.email
      .toLowerCase()
      .trim()
  }

  @BeforeUpdate()
  checkUserUpdate() {
    this.checkUserInsert();
  }
}
