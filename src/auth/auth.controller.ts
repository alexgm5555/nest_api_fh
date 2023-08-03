import { Controller, Get, Post, Body, UseGuards, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders, request } from 'http';
import { AuthService } from './auth.service';
import { Auth, GetRawHeaders, GetUser, RawHeaders } from './decorators';
import { RoleProtector } from './decorators/role-protector.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity ';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth') // para ponerle nombres a swagger y ordenarlos por ese nombre
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth(ValidRoles.admin) //ruta protegidacon el token
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }


  @Get('private')
  @UseGuards(AuthGuard())// para validar si el token es permitido en el backend
  testingPrivateRoute(
    // custom decorators
    // @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: User,
    @RawHeaders() rowHeaders: String[],
    @GetRawHeaders() request: Express.Request,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      user,
      userEmail,
      rowHeaders,
      headers
    }
  }

  @Get('private2')
  // custom guard con nest g gu [destino] cualquier afirmacion que retorne true o false
  // el ejemplo si el rol del usuario es permitido
  @SetMetadata('roles', ['admin','super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)// para validar si el token es permitido en el backend
  PrivateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  // custom guard con nest g gu [destino] cualquier afirmacion que retorne true o false
  // el ejemplo si el rol del usuario es permitido
  @RoleProtector(ValidRoles.superUser, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)// para validar si el token es permitido en el backend
  PrivateRoute3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private4')
  // custom guard con nest g gu [destino] cualquier afirmacion que retorne true o false
  // Ejemplo con los guard y customdecorators comprimido en auth
  @Auth(ValidRoles.user)
  PrivateRoute4(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('privateAdmin')
  // custom guard con nest g gu [destino] cualquier afirmacion que retorne true o false
  // Ejemplo con solo el admin podria ejecutar ese path
  @Auth(ValidRoles.admin)
  PrivateRouteAdmin(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }
}
