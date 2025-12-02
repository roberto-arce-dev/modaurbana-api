import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ClienteProfileService } from './cliente-profile.service';
import { UpdateClienteProfileDto } from './dto/update-cliente-profile.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('ClienteProfile')
@ApiBearerAuth('JWT-auth')
@Controller('cliente-profile')
export class ClienteProfileController {
  constructor(private readonly clienteprofileService: ClienteProfileService) {}

  @Get('me')
  @Roles(Role.CLIENTE, Role.ADMIN)
  @ApiOperation({ summary: 'Obtener mi perfil' })
  async getMyProfile(@CurrentUser() user: any) {
    return this.clienteprofileService.findOrCreateByUserId(user.userId);
  }

  @Put('me')
  @Roles(Role.CLIENTE, Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar mi perfil' })
  async updateMyProfile(@CurrentUser() user: any, @Body() dto: UpdateClienteProfileDto) {
    return this.clienteprofileService.update(user.userId, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos los perfiles (Admin)' })
  async findAll() {
    return this.clienteprofileService.findAll();
  }

  @Get(':userId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener perfil por userId (Admin)' })
  async findByUserId(@Param('userId') userId: string) {
    return this.clienteprofileService.findByUserId(userId);
  }
}
