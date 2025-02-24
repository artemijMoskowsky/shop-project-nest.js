import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

function generateString(length) {
    let result = '';
    while (result.length < length) {
      result += (Math.random() + 1).toString(36).substring(2);
    }
    return result.substring(0, length);
}

@Injectable()
export class ShopGlobalMiddleware implements NestMiddleware {
    use(@Req() req: Request, @Res({ passthrough: true }) res: Response, next: NextFunction){
        if (req.cookies["sessionID"] == undefined){
            res.cookie("sessionID", `${generateString(25)}`)
        } else {
            console.log(req.cookies["sessionID"]);
        }
        next();
    }
}