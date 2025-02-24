import { Body, Controller, Get, Post, Render, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthsService } from "src/auth-system/auths.service";
import { AuthDto, UserDto } from "src/auth-system/user.dto";
import { Request } from "express";


@Controller()
export class AuthController{
    constructor(private readonly authService: AuthService, private readonly authsService: AuthsService){}
    @Get("registration")
    @Render("registr")
    getRegistr(){
        return this.authService.getRegistr();
    }
    
    @Post("registration")
    @Render("registr")
    @UsePipes(new ValidationPipe({ transform: true }))
    async postRegistr(@Body() dto: UserDto){
        console.log(dto)
        await this.authsService.createUser(dto);
        return this.authService.getRegistr();
    }

    @Get("login")
    @Render("login")
    getLogin(){
        return this.authService.getLogin();
    }

    @Post("login")
    @Render("login")
    async postLogin(@Body() dto: AuthDto, @Req() request: Request){
        let session = await this.authsService.getSession(request.cookies["sessionID"]);
        if (!session){
            session = await this.authsService.createSession(request.cookies["sessionID"]);
        }
        this.authsService.authUser(dto, session.id);
        return this.authService.getLogin();
    }

    @Get("all_users")
    async getAllUsers(){
        return await this.authsService.getAllUsers();
    }

    @Get("all_sessions")
    async getAll(){
        return await this.authsService.getAllSessions();
    }

    // Temporary solution for the duration of the tests
    @Get("delete_all_users")
    async deleteAllUsers(){
        return await this.authsService.deleteAllUsers();
    }

    // Temporary solution for the duration of the tests
    @Get("delete_all_sessions")
    async deleteAllSessions(){
        return await this.authsService.deleteAllSessions();
    }
}