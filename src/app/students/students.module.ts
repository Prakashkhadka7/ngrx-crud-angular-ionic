import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffect } from './state/student.effects';
import { studentReducer } from './state/student.reducer';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentsComponent,
    EditStudentsComponent,
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    StudentsRoutingModule,
    EffectsModule.forFeature([StudentEffect]),
    StoreModule.forFeature("students", studentReducer),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class StudentsModule { }
