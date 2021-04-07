import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Todo } from 'src/app/api/Todo.mode';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  @Output() todoCompleted = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  completeChange(event: MatCheckboxChange) {
    this.todoCompleted.emit({...event.source.value as unknown as Todo, completed: event.checked});
  }
}
