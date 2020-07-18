import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    id: new FormControl(''),
  });
  todos:any = [];
  addOrEdit:boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos = () => {
    this.todoService.getTodos()
      .subscribe(data => {
        this.todos = data;
      })
  }

  addTodo = () => {
    const title = this.todoForm.controls['title'].value;
    const text = this.todoForm.controls['text'].value;
    const newTodo = {
      title,
      text
    }

    this.todoService.postTodo(newTodo)
      .subscribe(res => {
        this.refreshTodos();
        this.todoForm.reset();
      })
  }

  editTodo = todoId => {
    this.todos.filter(todo => {
      if(todoId === todo.id) {
        this.todoForm.controls['text'].setValue(todo.text);
        this.todoForm.controls['title'].setValue(todo.title);
        this.todoForm.controls['id'].setValue(todo.id);
        this.addOrEdit = false;
      }
    })
    
  }

  updateTodo = () => {
    const id = this.todoForm.controls['id'].value;
    const title = this.todoForm.controls['title'].value;
    const text = this.todoForm.controls['text'].value;
    const updatedTodo = {
      title,
      text
    }
    this.todoService.updateTodo(id, updatedTodo)
      .subscribe(res => {
        this.addOrEdit = true;
        this.refreshTodos();
        this.todoForm.reset();
      })
  }

  deleteTodo = id => {
    this.todoService.deleteTodo(id)
      .subscribe(res => {
        this.refreshTodos();
      })
  }

}
