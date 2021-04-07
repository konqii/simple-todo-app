import { Pipe, PipeTransform } from '@angular/core';
import { groupBy, partial, partition, prop, propEq } from 'ramda';
import { Todo } from 'src/app/api/Todo.mode';

@Pipe({
  name: 'todoCompleted'
})
export class TodoCompletedPipe implements PipeTransform {

  transform(value: Todo[]): string {
    if (value) {
      const groupByCompleted = partition((todo: Todo) => todo.completed, value);
      const [completed, _] = groupByCompleted;
      return `${completed.length}/${value.length}`;
    }
    return '';
  }

}
