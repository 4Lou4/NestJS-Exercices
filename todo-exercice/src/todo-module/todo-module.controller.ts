import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TodoModuleService } from './todo-module.service';
import { TodoModel } from '../todo-model/todo-model';

@Controller()
export class TodoModuleController {
  constructor(private readonly todoService: TodoModuleService) {}

  @Post()
  create(@Body() todo: TodoModel): TodoModel {
    return this.todoService.create(todo);
  }

  @Get()
  findAll(): TodoModel[] {
    console.log('Get Works!');
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): TodoModel {
    try {
      return this.todoService.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Unknown error occurred');
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() todo: Partial<TodoModel>): TodoModel {
    try {
      return this.todoService.update(id, todo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Unknown error occurred');
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number): { message: string; count: number } {
    try {
      return this.todoService.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Unknown error occurred');
    }
  }
}
