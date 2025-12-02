import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath = 'uploads';
  private readonly thumbnailPath = 'uploads/thumbnails';
  private readonly uploadRoot: string;
  private readonly thumbnailRoot: string;

  constructor() {
    this.uploadRoot = path.join(__dirname, '..', '..', this.uploadPath);
    this.thumbnailRoot = path.join(__dirname, '..', '..', this.thumbnailPath);

    // Crear directorios si no existen
    if (!fs.existsSync(this.uploadRoot)) {
      fs.mkdirSync(this.uploadRoot, { recursive: true });
    }
    if (!fs.existsSync(this.thumbnailRoot)) {
      fs.mkdirSync(this.thumbnailRoot, { recursive: true });
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string; thumbnailUrl: string }> {
    const filename = `${Date.now()}-${file.originalname}`;
    const imagePath = path.join(this.uploadRoot, filename);
    const thumbnailFilename = `thumb-${filename}`;
    const thumbnailPath = path.join(this.thumbnailRoot, thumbnailFilename);

    // Guardar imagen original
    await sharp(file.buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toFile(imagePath);

    // Generar thumbnail
    await sharp(file.buffer)
      .resize(300, 300, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);

    return {
      url: `uploads/${filename}`,
      thumbnailUrl: `uploads/thumbnails/${thumbnailFilename}`,
    };
  }

  async processImage(file: Express.Multer.File): Promise<{ imagen: string; imagenThumbnail: string }> {
    const result = await this.uploadImage(file);
    return {
      imagen: result.url,
      imagenThumbnail: result.thumbnailUrl,
    };
  }

  async deleteImage(imagePath: string): Promise<void> {
    const fullPath = imagePath.startsWith('uploads/') ? imagePath : path.join('uploads', imagePath);
    const absolutePath = path.join(__dirname, '..', '..', fullPath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }

  async deleteImages(imagePath: string, thumbnailPath: string): Promise<void> {
    if (imagePath) await this.deleteImage(imagePath);
    if (thumbnailPath) await this.deleteImage(thumbnailPath);
  }
}
