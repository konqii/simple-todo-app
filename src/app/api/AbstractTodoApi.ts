import { Observable } from "rxjs";
import { Todo } from "./Todo.mode";

export abstract class AbstractTodoApi {
  abstract createTodo(todo: Todo): Observable<boolean>;
  
  abstract getTodo(id: string): Observable<Todo>;

  abstract getTodos(): Observable<Todo[]>;

  abstract updateTodo(id: string, partial: Partial<Todo>): Observable<boolean>;

  abstract deleteTodo(id: string): Observable<boolean>;
}