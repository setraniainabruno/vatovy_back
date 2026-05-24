import { PartialType } from '@nestjs/swagger';
import { CreateConteDto } from './create-conte.dto';

export class UpdateConteDto extends PartialType(CreateConteDto) {}
