import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService{
    getLogin(){
        return {
            layout: "base",
            styles: ["css/login.css"]
        }
    }
    getRegistr(){
        return {
            layout: "base",
            styles: ["css/registr.css"]
        }
    }
}