import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Todo } from '../api/Todo.model';

import { TodoPageComponent } from './todo-page.component';
import { TodoService } from './todo.service';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { TodoCompletedPipe } from './todo/todo-completed.pipe';
import { TodoItemComponent } from './todo/todo-list/todo-item/todo-item.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';

let todoServiceStub: Partial<TodoService>;

todoServiceStub = {
  complete: () => {},
  create: () => {},
  delete: () => {},
  todos$: of([{id: '1', title: '', description: '', completed: false}])
};

const todo: Todo = {
  id: '0',
  title: 'foo',
  description: '',
  completed: false
};

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPageComponent, TodoComponent, TodoListComponent, TodoItemComponent, TodoCompletedPipe, AddTodoComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatInputModule
      ],
      providers: [
        { provide: TodoService, useValue: todoServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call completed on todoService', () => {
    const spy = jest.spyOn(todoService, 'complete');

    component.completeTodo(todo);

    expect(spy).toHaveBeenCalledWith(todo);
  });

  it('should call completed on todoService', () => {
    const spy = jest.spyOn(todoService, 'create');

    component.addTodo(todo);

    expect(spy).toHaveBeenCalledWith(todo);
  });

  it('should call completed on todoService', () => {
    const spy = jest.spyOn(todoService, 'delete');

    component.deleteTodo(todo);

    expect(spy).toHaveBeenCalledWith(todo);
  });
});
