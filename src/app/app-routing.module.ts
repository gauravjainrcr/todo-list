import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '',  redirectTo: '/todo-list', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'todo-list', component: TodoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
