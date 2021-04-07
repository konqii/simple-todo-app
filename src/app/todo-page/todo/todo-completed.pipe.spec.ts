import { TodoCompletedPipe } from './todo-completed.pipe';

describe('TodoCompletedPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoCompletedPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the expected output', () => {
    const pipe = new TodoCompletedPipe();
    const output = pipe.transform([
      {id: '0', title: '', description: '', completed: false},
      {id: '1', title: '', description: '', completed: false},
      {id: '2', title: '', description: '', completed: true},
    ]);

    expect(output).toEqual('1/3');
  });

  it('should not throw if input is falsy', () => {
    const pipe = new TodoCompletedPipe();
    const undefinedInput = pipe.transform(undefined);
    const nullInput = pipe.transform(null);

    expect(undefinedInput).toEqual('');
    expect(nullInput).toEqual('');
  })
});
