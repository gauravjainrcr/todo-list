import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  configUrl = 'http://localhost:8080/';

  getTodos() {
    return this.http.get(this.configUrl+'todos');
  }

  postTodo(newTodo) {
    return this.http.post(this.configUrl+'todos', newTodo);
  }
  
  updateTodo(id, todo) {
    const url = `${this.configUrl}todos/${id}`;
    return this.http.put(url, todo);
  }
  
  deleteTodo(id) {
    const url = `${this.configUrl}todos/${id}`;
    return this.http.delete(url)
  }
}
