import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class ShopGlobalMiddleware implements NestMiddleware {
    use(@Req() req: Request, @Res({ passthrough: true }) res: Response, next: NextFunction){
        if (req.cookies["sessionId"] == undefined){
            res.cookie('sessionId', 'TestSession');
        } else {
            console.log(req.cookies["sessionId"]);
        }
        next();
    }
}