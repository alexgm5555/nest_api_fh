import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { SeedService } from './seed.service';

@ApiTags('Seed') // para ponerle nombres a swagger y ordenarlos por ese nombre
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin) 

  // se lo pondria para que solo un usuario con role de administrador pudiera eje
  // la accion y para eso tendria que primero ejecutar /auth/register
  // modificar en BD el role
  // ejecutar el /login sin el fullname, copiar el token del request
  // pegarlo en la pestaña postman auth ddonde aparece tambien Body y pegar en bearerToken Token y luego 
  // ejecutar el este path
  executeSeed() {
    return this.seedService.runSeed();
  }
}
