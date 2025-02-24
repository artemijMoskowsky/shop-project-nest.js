import { IsDate, IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UserDto {
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}

export class AuthDto {
    // @ValidateIf((data)=>!data.email)
    @IsString()
    // @IsNotEmpty()
    username: string

    // @ValidateIf((data)=>!data.name)
    // @IsEmail()
    // @IsNotEmpty()
    // email?: string

    @IsString()
    // @IsNotEmpty()
    password: string
}

export class SessionDto {
    @IsString()
    @IsNotEmpty()
    token: string
    
    @IsDate()
    date: Date
}