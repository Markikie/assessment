import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Define the payload interface for better type safety
interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,  // Optionally set to false for proper expiration handling
      secretOrKey: configService.get<string>('JWT_SECRET'), // Make sure 'JWT_SECRET' is correctly set in your environment
    });
  }

  // 'validate' method will be called after the JWT has been successfully verified
  validate(payload: JwtPayload) {
    return { 
      userId: payload.sub,  // Returning the user ID
      email: payload.email, // Returning the email
    };
  }
}
