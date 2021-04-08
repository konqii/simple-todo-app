import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/api/Todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todos: Todo[];
  @Output() completedTodo = new EventEmitter<Todo>();
  @Output() deletedTodo = new EventEmitter<Todo>();
  @Output() addedTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

}
