import { Observable } from "rxjs";
import { Todo } from "./Todo.model";

export interface TodoApi {
  createTodo(todo: Todo): Observable<boolean>;
  
  getTodo(id: string): Observable<Todo>;

  getTodos(): Observable<Todo[]>;

  updateTodo(id: string, partial: Partial<Todo>): Observable<boolean>;

  deleteTodo(id: string): Observable<boolean>;
}