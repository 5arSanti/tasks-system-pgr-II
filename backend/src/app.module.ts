import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
import { SubjectsModule } from './subjects/subjects.module';
import appConfigurations from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [appConfigurations],

     }),
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto',
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
    TasksModule,
    SubjectsModule,
  ],
  providers: [AppService],
})
export class AppModule { }
