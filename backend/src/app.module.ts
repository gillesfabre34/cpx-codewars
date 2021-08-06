import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KataModule } from './kata/kata.module';

@Module({
  imports: [KataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
