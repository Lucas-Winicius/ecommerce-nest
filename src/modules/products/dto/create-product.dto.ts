export class CreateProductDto {
  id?: string;
  name: string;
  description: string;
  price: string;
  image: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
