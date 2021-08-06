import { Module } from '@nestjs/common';
import { KataController } from './kata.controller';
import { KataService } from './kata.service';

@Module({
  controllers: [KataController],
  providers: [KataService]
})
export class KataModule {}
