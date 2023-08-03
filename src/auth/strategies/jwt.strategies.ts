import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity ';
import { JwtPayload } from '../interfaces/jwt-pyload.interfaces';

export class JwtStrategie extends PassportStrategy( Strategy ) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService
  ){
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // LA POSICION DONDE ESPERO EL TOKEN BEARER TOKE EN EL POSTMAN BUSCAR
    })
  }

  async validate (payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOneBy({id});
    if (!user)
      throw new UnauthorizedException('Token not valid');
    if (!user.isActive)
      throw new UnauthorizedException('User is not active');
    
    
    return user;
  }
}