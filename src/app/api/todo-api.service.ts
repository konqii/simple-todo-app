import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AbstractTodoApi } from './AbstractTodoApi';
import { Todo } from './Todo.mode';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService extends AbstractTodoApi {
  private baseUrl: string = environment.todo;
  private headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

  constructor(private readonly http: HttpClient) {
    super();
  }

  public createTodo(todo: Todo): Observable<boolean> {
    const url = this.createUrl();
    return this.http.post(url, todo, {headers: this.headers}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  
  public getTodo(id: string): Observable<Todo> {
    const url = this.createUrl(id);
    return this.http.get<Todo>(url, {headers: this.headers});
  }

  public getTodos(): Observable<Todo[]> {
    const url = this.createUrl();
    return this.http.get<Todo[]>(url, {headers: this.headers});
  }

  public updateTodo(id: string, partial: Partial<Todo>): Observable<boolean> {
    const url = this.createUrl(id);
    return this.http.patch(url, {...partial}, {headers: this.headers}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public deleteTodo(id: string): Observable<boolean> {
    const url = this.createUrl(id);
    return this.http.delete(url, {headers: this.headers}).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  private createUrl(id?: string) {
    const url = `${this.baseUrl}/todos`;
    return id ? `${url}/${id}` : url;
  }
}
