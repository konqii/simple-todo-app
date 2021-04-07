import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/api/Todo.mode';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Output() todoAdded = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const { title } = form.value;
    this.todoAdded.emit({
      id: uuid(),
      title,
      description: '',
      completed: false
    });

    form.resetForm();
  }

}
