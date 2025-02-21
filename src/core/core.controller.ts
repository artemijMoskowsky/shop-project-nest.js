import { Controller, Get, Render } from "@nestjs/common";
import { CoreService } from "./core.service";

@Controller()
export class CoreController{

    constructor(private CoreService: CoreService){

    }

    @Get()
    @Render("index")
    getHome(){
        return this.CoreService.getHome();
    }

    @Get("contacts/")
    @Render("contacts")
    getContacts(){
        return this.CoreService.getContacts();
    }
}