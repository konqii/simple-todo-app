import { Injectable } from '@angular/core';
import { propEq, when } from 'ramda';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, mapTo, startWith, switchMap } from 'rxjs/operators';
import { TodoApiService } from '../api/todo-api.service';
import { Todo } from '../api/Todo.mode';

interface TodoState {
  todos: Todo[];
}

let _state = {
  todos: []
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private store = new BehaviorSubject(_state);
  private state$ = this.store.asObservable();

  public todos$ = this.state$.pipe(map((state: TodoState) => state.todos), distinctUntilChanged());

  private createTodo = new Subject();
  private updateTodo = new Subject();
  private deleteTodo = new Subject();

  constructor(private readonly api: TodoApiService) {
    combineLatest([this.updateTodo, this.deleteTodo]).pipe(
      startWith([]),
      switchMap(() => this.api.getTodos())
    ).subscribe((todos: Todo[]) => {
      this.updateState({..._state, todos});
    });

    this.createTodo.pipe(
      switchMap((todo: Todo) => {
        return this.api.createTodo(todo).pipe(
          mapTo(todo)
        );
      })
    ).subscribe((todo: Todo) => {
      const newTodos = _state.todos.concat(todo);
      this.updateState({..._state, todos: newTodos});
    })

    this.updateTodo.pipe(
      switchMap((todo: Todo) => {
        return this.api.updateTodo(todo.id, {completed: todo.completed}).pipe(
          mapTo(todo)
        );
      })
    ).subscribe((todo: Todo) => {
      const updatedTodos = this.updateTodosWithTodo(_state.todos, todo);
      this.updateState({..._state, todos: updatedTodos});
    });

    this.deleteTodo.pipe(
      switchMap((todo: Todo) => {
        return this.api.deleteTodo(todo.id).pipe(
          mapTo(todo)
        );
      })
    ).subscribe((todo: Todo) => {
      const filteredTodos = _state.todos.filter((t: Todo) => t.id !== todo.id);
      this.updateState({..._state, todos: filteredTodos});
    });
  }

  public create(todo: Todo) {
    this.createTodo.next(todo);
  }

  public complete(todo: Todo): void {
    this.updateTodo.next(todo);
  }

  public delete(todo: Todo): void {
    this.deleteTodo.next(todo);
  }

  private updateTodosWithTodo(todos: Todo[], todo: Todo): Todo[] {
    return todos.map(when(propEq('id', todo.id), () => todo)) as Todo[];
  }

  private updateState(state: TodoState): void {
    this.store.next(_state = state);
  }
}
