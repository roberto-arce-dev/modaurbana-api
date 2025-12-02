import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteProfile, ClienteProfileSchema } from './schemas/cliente-profile.schema';
import { ClienteProfileService } from './cliente-profile.service';
import { ClienteProfileController } from './cliente-profile.controller';
import { User, UserSchema } from '../auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClienteProfile.name, schema: ClienteProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ClienteProfileController],
  providers: [ClienteProfileService],
  exports: [ClienteProfileService],
})
export class ClienteProfileModule {}
