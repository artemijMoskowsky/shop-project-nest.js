import { Module } from "@nestjs/common";
import { AuthsController } from "./auths.controller";
import { AuthsService } from "./auths.service";
import { PrismaService } from "src/prisma.service";


@Module({
    imports: [],
    controllers: [AuthsController],
    providers: [AuthsService, PrismaService],
    exports: [AuthsService, PrismaService]
})
export class AuthsModule{}