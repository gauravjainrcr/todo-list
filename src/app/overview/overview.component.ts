import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  todos:any = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe(data => {
        this.todos = data;
      })
  }

}
