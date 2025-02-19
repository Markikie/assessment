import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',  
      password: 'password', 
      database: 'assessment',    
      entities: [User],
      synchronize: true,     
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}