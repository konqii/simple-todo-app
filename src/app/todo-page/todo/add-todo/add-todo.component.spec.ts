import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from 'src/app/api/Todo.mode';

import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done: jest.DoneCallback) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should emit todo', (done: jest.DoneCallback) => {
    const spy = jest.spyOn(component.todoAdded, 'emit');
    const form: NgForm = {
      value: {
        title: 'todo'
      },
      resetForm: () => null
    } as NgForm;
    component.onSubmit(form);
    expect(spy).toHaveBeenCalled();
    done();
  })
});
