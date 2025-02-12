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
}