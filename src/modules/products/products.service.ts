import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      return updatedProduct;
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('This product not exists');
      } else {
        throw e;
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
