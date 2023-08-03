import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../../products/entities';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text',{
    select:  false // se pone para que no aparezca en el find ya que e un dato sensible 
  })
  password: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text')
  fullName:string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty()// para que aparezca el campo en swaegger
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
