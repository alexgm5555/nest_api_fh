import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity ';
import { JwtStrategie } from './strategies/jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategie],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService)=> {
        console.log('jwt con config service', configService.get('JWT_SECRET'));
        console.log('jwt desde env directo', process.env.JWT_SECRET);
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      },
    })
    // JwtModule.register({
    //   secret:process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn:'2h'
    //   }
    // })
  ],
  exports: [TypeOrmModule, JwtStrategie, PassportModule, JwtModule]
})
export class AuthModule {}
