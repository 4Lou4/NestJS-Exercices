import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from '../todo-model/todo-model';

@Injectable()
export class TodoModuleService {
  private todos: TodoModel[] = [];

  create(todo: TodoModel): TodoModel {
    const { name, description, status } = todo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }

    const newTodo: TodoModel = {
      id,
      name,
      description,
      creationDate: new Date(),
      status,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): TodoModel[] {
    console.log('Get Works!');
    return this.todos;
  }

  findOne(id: number): TodoModel {
    const todo = this.todos.find((actualTodo) => actualTodo.id === id);
    if (todo) return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  update(id: number, newTodo: Partial<TodoModel>): TodoModel {
    const todo = this.findOne(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }

  delete(id: number): { message: string; count: number } {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return {
      message: `Le todo d'id ${id} a été supprimé avec succès`,
      count: 1,
    };
  }
}
