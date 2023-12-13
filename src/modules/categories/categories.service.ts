import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return category;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Category already exists');
      } else {
        throw e;
      }
    }
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: { products: true },
    });

    return categories;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return updatedCategory;
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Category not exists');
      } else {
        throw e;
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
