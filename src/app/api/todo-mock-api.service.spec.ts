import { TestBed } from '@angular/core/testing';
import { map, mapTo, switchMap } from 'rxjs/operators';

import { TodoMockApiService } from './todo-mock-api.service';
import { Todo } from './Todo.model';

describe('TodoMockApiService', () => {
  let service: TodoMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todo item', (done: jest.DoneCallback) => {
    service.getTodos().pipe(
      map((todos: Todo[]) => {
        return todos.length;
      }),
      switchMap((count: number) => {
        return service.createTodo(
          {id: 'foo', title: 'foo', description: 'foo', completed: false}
        ).pipe(
          map(() => count)
        );
      }),
      switchMap((count: number) => {
        return service.getTodos().pipe(
          map((todos: Todo[]) => count + 1 === todos.length)
        )
      })
    ).subscribe((result: boolean) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should update todo item', (done: jest.DoneCallback) => {
    service.updateTodo('0', {title: 'foo', completed: true}).pipe(
      switchMap(() => service.getTodo('0'))
    ).subscribe((todo: Todo) => {
      expect(todo.title).toEqual('foo');
      expect(todo.completed).toEqual(true);
      done();
    });
  });

  it('should delete item', (done: jest.DoneCallback) => {
    service.getTodos().pipe(
      map((todos: Todo[]) => {
        return todos.length;
      }),
      switchMap((count: number) => {
        return service.deleteTodo('0').pipe(
          mapTo(count)
        );
      }),
      switchMap((count: number) => {
        return service.getTodos().pipe(
          map((todos: Todo[]) => count - 1 === todos.length)
        )
      })
    ).subscribe((result: boolean) => {
      expect(result).toEqual(true);
      done();
    });
  });
});
