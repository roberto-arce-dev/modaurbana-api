import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClienteProfile, ClienteProfileDocument } from './schemas/cliente-profile.schema';
import { CreateClienteProfileDto } from './dto/create-cliente-profile.dto';
import { UpdateClienteProfileDto } from './dto/update-cliente-profile.dto';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class ClienteProfileService {
  constructor(
    @InjectModel(ClienteProfile.name) private clienteprofileModel: Model<ClienteProfileDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userId: string, dto: CreateClienteProfileDto): Promise<ClienteProfileDocument> {
    const profile = await this.clienteprofileModel.create({
      user: new Types.ObjectId(userId),
      ...dto,
    });
    return profile;
  }

  async findByUserId(userId: string): Promise<ClienteProfileDocument | null> {
    return this.clienteprofileModel.findOne({ user: new Types.ObjectId(userId) }).populate('user', 'email role').exec();
  }

  async findOrCreateByUserId(userId: string): Promise<ClienteProfileDocument> {
    const existing = await this.findByUserId(userId);
    if (existing) return existing;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const nombreFallback = user.email ? user.email.split('@')[0] : 'Usuario';
    const created = await this.create(userId, {
      nombre: nombreFallback,
    });
    return created.populate('user', 'email role');
  }

  async findAll(): Promise<ClienteProfile[]> {
    return this.clienteprofileModel.find().populate('user', 'email role').exec();
  }

  async update(userId: string, dto: UpdateClienteProfileDto): Promise<ClienteProfileDocument> {
    // Asegurar que exista un profile; si no existe, crearlo con valores mínimos
    const profile = await this.findOrCreateByUserId(userId);
    Object.assign(profile, dto);
    await profile.save();
    return profile;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.clienteprofileModel.deleteOne({ user: new Types.ObjectId(userId) });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Profile no encontrado');
    }
  }
}
