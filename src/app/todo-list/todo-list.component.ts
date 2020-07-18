import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    id: new FormControl(''),
  });
  todos:any = [];
  addOrEdit:boolean = true;
  filteredTodos:any = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos = () => {
    this.todoService.getTodos()
      .subscribe(data => {
        this.todos = data;
        this.filteredTodos = data;
      })
  }

  addTodo = () => {
    if(this.todoForm.status == "VALID") {
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

  searchTodo = searchText => {
    if(searchText != '') {
      this.filteredTodos = this.todos.filter(todo => {
        return (todo.text.toLowerCase().includes(searchText.toLowerCase()) || todo.title.toLowerCase().includes(searchText.toLowerCase()))
      })
    }
  }

}
