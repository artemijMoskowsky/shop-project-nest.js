import { Injectable } from "@nestjs/common";

@Injectable()
export class CoreService{
    getHome(){
        return {
            layout: "base",
            styles: ["css/index.css"]
            
        };
    }
}