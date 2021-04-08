import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from 'src/app/api/Todo.model';
import { TodoItemComponent } from './todo-item/todo-item.component';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoItemComponent ],
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit with todo', () => {
    const toEmitTodo: Todo = {
      id: '00',
      title: 'mockTodo',
      description: 'Cillum commodo ut veniam sit ex ipsum commodo adipisicing ut officia dolore amet.',
      completed: false
    }
    const spy = jest.spyOn(component.todoCompleted, 'emit');
    component.completeChange({checked: true, source: {value: toEmitTodo} as any})
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({...toEmitTodo, completed: true});
  });
});
