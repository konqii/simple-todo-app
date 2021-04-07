import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../api/Todo.mode';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  public todos$: Observable<Todo[]>;

  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  public completeTodo(todo: Todo) {
    this.todoService.complete(todo);
  }

  public deleteTodo(todo: Todo) {
    this.todoService.delete(todo);
  }

  public addTodo(todo: Todo) {
    this.todoService.create(todo);
  }

}
