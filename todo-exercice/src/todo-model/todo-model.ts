import { TodoStatus } from './todo-status.enum';

export class TodoModel {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  status: TodoStatus;
}
