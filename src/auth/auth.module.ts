import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthsService } from "src/auth-system/auths.service";
import { AuthsModule } from "src/auth-system/auths.module";


@Module({
    imports: [AuthsModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{}