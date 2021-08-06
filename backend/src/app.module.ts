import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUtModule } from './file-ut/file-ut.module';

@Module({
  imports: [FileUtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
