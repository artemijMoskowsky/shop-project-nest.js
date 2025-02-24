import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ProductDto } from "./product.dto";


@Injectable()
export class StoreSystemService{
    constructor(private prisma: PrismaService){}

    generateToken(length){
        let result = '';
        while (result.length < length) {
            result += (Math.random() + 1).toString(36).substring(2);
        }
        return result.substring(0, length);
    }

    async getBasket(id: number){
        return await this.prisma.basket.findUnique({
            where: { id: id }
        })
    }

    async createBasket(userId: number){
        return await this.prisma.basket.create({
            data: {
                user: {
                    connect: { id: userId }
                }
            }
        });
    }

    async getProduct(token: string){
        return await this.prisma.product.findUnique({
            where: { token: token }
        });
    }

    async createProduct(productDto: ProductDto){
        let product: any = null;
        let token = this.generateToken(40);
        while (product == null){
            try {
                product = await this.prisma.product.create({
                    data: {
                        token: token,
                        name: productDto.name,
                        imagePath: productDto.imagePath,
                        price: productDto.price,
                        count: productDto.count,
                        description: productDto.description
                    }
                });
            }
            catch (error){
                console.log(`Product with token ${token} is already exist`);
                token = this.generateToken(40);
            }
        }
        return product;
    }

    async addProductToBasket(basketId: number, productToken: string, count: number){
        const product = await this.prisma.product.findUnique({
            where: { token: productToken }
        });
        const record = await this.prisma.productsInBaskets.findUnique({
            where: {
                basketId_productToken: { basketId: basketId, productToken: productToken }
            }
        });

        if (!record && product){
            return await this.prisma.productsInBaskets.create({
                data: {
                    basketId: basketId,
                    productToken: productToken,
                    count: count
                }
            })
        } else if (record && product){
            if (record.count + count <= product.count){
                return await this.prisma.productsInBaskets.update({
                    where: {
                        basketId_productToken: { basketId: basketId, productToken: productToken }
                    },
                    data: {
                        count: record.count + count
                    }
                });
            } else {
                return "Count is too large";
            }
        } else {
            return "Product does not exist";
        }
    }
    
}