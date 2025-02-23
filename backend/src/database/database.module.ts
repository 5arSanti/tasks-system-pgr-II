import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'DATA_SOURCE',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const dataSource = new DataSource({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: [],
                    synchronize: false,
                });

                return dataSource.initialize();
            },
        },
    ],
    exports: ['DATA_SOURCE'],
})
export class DatabaseModule { }
