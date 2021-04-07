import { TestBed } from '@angular/core/testing';
import { TodoApiService } from '../api/todo-api.service';
import { TodoMockApiService } from '../api/todo-mock-api.service';
import { Todo } from '../api/Todo.mode';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    const todoServiceStub = new TodoService(new TodoMockApiService() as unknown as TodoApiService);
    TestBed.configureTestingModule({
      providers: [
        { provide: TodoService, useValue: todoServiceStub }
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todo', (done: jest.DoneCallback) => {
    const spy = jest.spyOn(service, 'create');
    const mockTodo = {id: '11111', title: 'mocktodo', description: 'mock', completed: false};
    service.create(mockTodo);
    
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockTodo);

    service.todos$.subscribe((todos: Todo[]) => {
      const createdTodo = todos.find((todo: Todo) => todo.id === mockTodo.id);
      expect(createdTodo).toBeDefined();
      expect(createdTodo.id).toEqual(mockTodo.id);
      done();
    });
  });

  it('should delete todo', (done: jest.DoneCallback) => {
    const spy = jest.spyOn(service, 'delete');
    const mockTodo: Todo = {
      id: '0',
      title: 'Ullamco minim mollit ex duis nulla.',
      description: 'Eiusmod labore pariatur exercitation do esse esse elit commodo elit deserunt ut.',
      completed: false
    };
    service.delete(mockTodo);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockTodo);

    service.todos$.subscribe((todos: Todo[]) => {
      expect(todos.length).toEqual(0);
      done();
    });
  });
});
