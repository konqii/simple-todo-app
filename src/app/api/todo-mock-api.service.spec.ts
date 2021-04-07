import { TestBed } from '@angular/core/testing';

import { TodoMockApiService } from './todo-mock-api.service';

describe('TodoMockApiService', () => {
  let service: TodoMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
