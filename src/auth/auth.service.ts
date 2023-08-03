import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity ';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-pyload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });// lo prepara para  subirlo
      await this.usersRepository.save(user); // lo sube a la bd
      delete user.password;
      return {...user, token: this.getJwtToken({
        id: user.id
      })};;
      //json webToken
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const {password, email} =loginUserDto;
    // para que me retorne solo la data que necesito
    const user = await this.usersRepository.findOne({
      where: {email}, //  manda la condición del email
      select: {email: true, password: true, id: true} // seleccione los campos que interesan 
    });
    // const user = await this.usersRepository.findOneBy({email});
    if (!user)
      throw new UnauthorizedException('Credential are not valid!');
    if (!bcrypt.compareSync(password, user.password)) 
      throw new UnauthorizedException('Credential are not valid p!');
    return {...user, token: this.getJwtToken({
      id: user.id
    })};
  }

  async checkAuthStatus(user: User) {
    return {...user, token: this.getJwtToken({
      id: user.id
    })};
  }

  private getJwtToken( payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never { // el never fuerza a que jamas de un return en el metodo
    if (error.code === 23505)
      throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check Server logs');
      
  }
}
