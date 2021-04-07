import { TestBed } from '@angular/core/testing';
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
import { AppComponent } from './app.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { TodoService } from './todo-page/todo.service';
import { AddTodoComponent } from './todo-page/todo/add-todo/add-todo.component';
import { TodoCompletedPipe } from './todo-page/todo/todo-completed.pipe';
import { TodoItemComponent } from './todo-page/todo/todo-list/todo-item/todo-item.component';
import { TodoListComponent } from './todo-page/todo/todo-list/todo-list.component';
import { TodoComponent } from './todo-page/todo/todo.component';

let todoServiceStub: Partial<TodoService> = {
  complete: () => {},
  create: () => {},
  delete: () => {},
  todos$: of([{id: '1', title: '', description: '', completed: false}])
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoPageComponent,
        TodoComponent,
        TodoListComponent,
        TodoItemComponent,
        TodoCompletedPipe,
        AddTodoComponent
      ],
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
