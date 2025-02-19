import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { In, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm"; 
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,  
        private readonly jwtService: JwtService,
    ) {}

    async register(RegisterDto: RegisterDto){
        const hashedPassword = await bcrypt.hash(RegisterDto.password, 10);

        const user = this.userRepository.create({
            email: RegisterDto.email,
            password: hashedPassword
        });

        await this.userRepository.save(user);

        return {
            message: 'User created successfully'
        };
    }
    async login(loginDto: LoginDto){
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
          });
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
          });
      
          return {
            access_token: token,
          };
    }
    async logout(userId: number) {
        await this.userRepository.update(userId, { refreshToken: String });
        return {
          message: 'Logged out successfully',
        };
      }
}