import { Injectable } from '@angular/core';
import * as studentActions from './student.actions';
import { StudentService } from '../student.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Student } from '../student.model';
import {catchError, map,mergeMap} from 'rxjs/operators';
@Injectable()
export class StudentEffect{
  constructor(private actions$ : Actions,private studentService:StudentService){  }

// loadStudents$:Observable<Action> = createEffect(() => this.actions$.pipe(ofType<StudentActions.LOAD_STUDENTS>(
//   StudentActions.StudentActionTypes.LOAD_STUDENTS
// ),
// mergeMap((actions: StudentActions.LOAD_STUDENTS)=>
// this.studentService.getStudents().pipe(
//   map((students: Student[])=>
//   new StudentActions.LOAD_STUDENT_SUCCESS(students)
// ),
// catchError(err=> of(new StudentActions.LOAD_STUDENT_FAIL(err)))
// ))));
// constructor(
//   private actions$: Actions,
//   private customerService: CustomerService
// ) {}

@Effect()
loadStudents$: Observable<Action> = this.actions$.pipe(
  ofType<studentActions.LoadStudents>(
    studentActions.StudentActionTypes.LOAD_STUDENTS
  ),
  mergeMap((action: studentActions.LoadStudents) =>
    this.studentService.getStudents().pipe(
      map(
        (customers: Student[]) =>
          new studentActions.LoadStudentsSuccess(customers)
      ),
      catchError(err => of(new studentActions.LoadStudentsFail(err)))
    )
  )
);
}
