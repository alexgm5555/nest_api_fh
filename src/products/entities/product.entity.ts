import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity ';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' }) //con esto se cambian los nombres de las tablas
export class Product {
  @ApiProperty({
    example: 'weytiquwr-eyqtwie-qwetirq', // para que en el sawwe y en el boton shema aparezca en el ejemplo
    description: 'produc ID',
    uniqueItems: true
  })// para que aparezca el campo en swaegger
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('float', {
    default: 0,
  })
  stock: number;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text')
  gender: string;

  @ApiProperty()// para que aparezca el campo en swaegger
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true, //para que me ponga las relaciones de la tabla
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE', // para eliminar no solo el resgistro si no las relaciones por la llave foranea
  })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
