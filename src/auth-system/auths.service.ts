import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AuthDto, SessionDto, UserDto } from "./user.dto";


@Injectable()
export class AuthsService{
    constructor(private prisma: PrismaService){}

    async getSession(token: string){
        return await this.prisma.session.findUnique({
            where: {
                token: token
            }
        });
    }

    async createSession(token: string){
        const existSession = await this.prisma.session.findUnique({
            where: {
                token: token
            }
        });
        if (existSession) {
            throw new ConflictException("Session with this token is already exist");
        }
        
        let date = new Date()
        date.setDate(date.getDate() + 1)

        const session = await this.prisma.session.create({
            data: {
                token: token,
                date: date
            }
        })

        return session;

    }

    async getUserByName(username: string){
        return await this.prisma.user.findUnique({
            where: {
                username: username
            }
        });
    }
    async getUserByEmail(email: string){
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async getUserPassword(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (user){
            return user?.password;
        } else {
            return null;
        }
    }

    async createUser(dto: UserDto){
        const {username, email, password} = dto;
        
        const existUser = await this.prisma.user.findFirst({
            where: { OR: [{ username: username }, { email: email }]}
        });

        if (existUser) {
            throw new ConflictException('User with this email or username already exists');
        }

        const user = await this.prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        });

        return user;
    }

    async authUser(dto: AuthDto, sessionId: number){
        const {username, password} = dto;
        
        const user = await this.prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (user && user.password == password){
            await this.prisma.session.update({
                where: { id: sessionId },
                data: {
                    user: {
                        connect: { id: user?.id }
                    }
                }
            })
        } else {
            // throw new ConflictException("User does not exist");
            console.log(user, user?.password, password)
        }
    }

    async getAllUsers(){
        return await this.prisma.user.findMany();
    }

    async getAllSessions(){
        return await this.prisma.session.findMany();
    }

    async deleteAllUsers(){
        await this.prisma.user.deleteMany();
        return null;
    }

    async deleteAllSessions(){
        await this.prisma.session.deleteMany();
        return null;
    }
}