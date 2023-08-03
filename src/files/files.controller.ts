import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@ApiTags('images') // para ponerle nombres a swagger y ordenarlos por ese nombre
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  UploadProductImages() {
    return 'Hola Alex';
  }
}
