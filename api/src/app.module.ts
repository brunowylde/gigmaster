import { Module } from '@nestjs/common';
import { MusicaModule } from './musica/musica.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MusicaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), // Ajuste a porta se necessário
      username: process.env.DB_USERNAME, // Seu usuário no banco
      password: process.env.DB_PASSWORD,   // Sua senha no banco
      database: process.env.DB_NAME, // Nome do banco já existente
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Localização das suas entidades
      synchronize: false, // Mantenha `false` se o banco já estiver criado para evitar alterações automáticas
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
