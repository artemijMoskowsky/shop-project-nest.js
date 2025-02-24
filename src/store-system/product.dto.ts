import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class ProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @IsString()
    @IsNotEmpty()
    imagePath: string

    @IsInt()
    @IsNotEmpty()
    price: number

    @IsInt()
    @IsNotEmpty()
    count: number

    @IsString()
    @IsNotEmpty()
    description: string
}