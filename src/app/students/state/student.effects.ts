import { Injectable } from '@angular/core';
import * as studentActions from './student.actions';
import { StudentService } from '../student.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Student } from '../student.model';
import { catchError, map, mergeMap } from 'rxjs/operators';
@Injectable()
export class StudentEffect {
  constructor(
    private actions$: Actions,
    private studentService: StudentService
  ) {}

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
        catchError((err) => of(new studentActions.LoadStudentsFail(err)))
      )
    )
  );

  @Effect()
  loadStudent$: Observable<Action> = this.actions$.pipe(
    ofType<studentActions.LoadStudent>(
      studentActions.StudentActionTypes.LOAD_STUDENT
    ),
    mergeMap((action: studentActions.LoadStudent) =>
      this.studentService.getstudentById(action.payload).pipe(
        map(
          (students: Student) => new studentActions.LoadStudentSuccess(students)
        ),
        catchError((err) => of(new studentActions.LoadStudentFail(err)))
      )
    )
  );

  @Effect()
  createStudent$: Observable<Action> = this.actions$.pipe(
    ofType<studentActions.CreateStudent>(
      studentActions.StudentActionTypes.CREATE_STUDENT
    ),
    map((action: studentActions.CreateStudent) => action.payload),
    mergeMap((student: Student) =>
      this.studentService.createStudent(student).pipe(
        map(
          (students: Student) =>
            new studentActions.CreateStudentSuccess(students)
        ),
        catchError((err) => of(new studentActions.CreateStudentFail(err)))
      )
    )
  );

  @Effect()
  updateStudent$: Observable<Action> = this.actions$.pipe(
    ofType<studentActions.UpdateStudent>(
      studentActions.StudentActionTypes.UPDATE_STUDENT
    ),
    map((action: studentActions.UpdateStudent) => action.payload),
    mergeMap((student: Student) =>
      this.studentService.updateStudent(student).pipe(
        map(
          (updateStudent: Student) =>
            new studentActions.UpdateStudentSuccess({
              id: updateStudent.id,
              changes: updateStudent,
            })
        ),
        catchError((err) => of(new studentActions.UpdateStudentFail(err)))
      )
    )
  );

  @Effect()
  deleteStudent$: Observable<Action> = this.actions$.pipe(
    ofType<studentActions.DeleteStudent>(
      studentActions.StudentActionTypes.DELETE_STUDENT
    ),
    map((action: studentActions.DeleteStudent) => action.payload),
    mergeMap((id: number) =>
      this.studentService.deleteStudent(id).pipe(
        map(() => new studentActions.DeleteStudent(id)),
        catchError((err) => of(new studentActions.UpdateStudentFail(err)))
      )
    )
  );
}
