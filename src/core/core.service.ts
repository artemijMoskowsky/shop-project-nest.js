import { Injectable } from "@nestjs/common";

@Injectable()
export class CoreService{
    getHome(){
        return {
            layout: "base",
            styles: ["css/index.css"]
            
        };
    }
    getContacts(){
        return {
            layout: "base",
            styles: ["css/contacts.css"]
        }
    }
}