import { Module } from "@nestjs/common";
import { AuthSystemController } from "./auths.controller";
import { AuthSystemService } from "./auths.service";
import { PrismaService } from "src/prisma.service";


@Module({
    imports: [],
    controllers: [AuthSystemController],
    providers: [AuthSystemService, PrismaService],
    exports: [AuthSystemService, PrismaService]
})
export class AuthsModule{}