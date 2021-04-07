import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AbstractTodoApi } from './AbstractTodoApi';
import { Todo } from './Todo.mode';

@Injectable({
  providedIn: 'root'
})
export class TodoMockApiService extends AbstractTodoApi {
  private mockData: Todo[] = [{
    id: '0',
    title: 'Ullamco minim mollit ex duis nulla.',
    description: 'Eiusmod labore pariatur exercitation do esse esse elit commodo elit deserunt ut.',
    completed: false
  }];

  createTodo(todo: Todo): Observable<boolean> {
    this.mockData = this.mockData.concat(todo);
    return of(true);
  }
  getTodo(id: string): Observable<Todo> {
    const mock = this.findById(id, this.mockData);
    return of(mock);
  }
  getTodos(): Observable<Todo[]> {
    return of(this.mockData);
  }
  updateTodo(id: string, partial: Partial<Todo>): Observable<boolean> {
    const toUpdate = this.findById(id, this.mockData);
    const updated = {...toUpdate, ...partial};
    this.mockData = [
      ...this.mockData.filter((todo: Todo) => todo.id !== id),
      updated
    ];

    return of(true);
  }
  deleteTodo(id: string): Observable<boolean> {
    this.mockData = this.mockData.filter((todo) => todo.id !== id);
    return of(true);
  }

  private findById(id: string, data: Todo[]) {
    return data.filter((todo) => todo.id === id)[0];
  }
}
