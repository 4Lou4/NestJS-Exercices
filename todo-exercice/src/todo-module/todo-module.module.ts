import { Module } from '@nestjs/common';
import { TodoModuleController } from './todo-module.controller';
import { TodoModuleService } from './todo-module.service';

@Module({
  controllers: [TodoModuleController],
  providers: [TodoModuleService]
})
export class TodoModuleModule {}
