import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsComponent } from './students.component';
import { AddStudentsComponent } from './add-students/add-students.component';

const routes: Routes = [
  {path:'',component:StudentsComponent},
  {path:'add',component:AddStudentsComponent},
  {path:'**',redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
