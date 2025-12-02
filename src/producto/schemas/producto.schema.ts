import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductoDocument = Producto & Document;

@Schema({ timestamps: true })
export class Producto {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion?: string;

  @Prop({ enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] })
  talla?: string;

  @Prop()
  material?: string;

  @Prop()
  estilo?: string;

  @Prop()
  color?: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ default: 0, min: 0 })
  stock?: number;

  @Prop({ type: Types.ObjectId, ref: 'Categoria', required: true })
  categoria: Types.ObjectId;

  @Prop()
  imagen?: string;

  @Prop()
  imagenThumbnail?: string;

  @Prop({ default: false })
  tendencia?: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);

ProductoSchema.index({ categoria: 1 });
ProductoSchema.index({ talla: 1 });
ProductoSchema.index({ nombre: 'text' });
