import { Action } from '@ngrx/store';
import { Student } from '../student.model';
import { Update } from '@ngrx/entity';

export enum StudentActionTypes {
  LOAD_STUDENTS = '[STUDENT] LOAD STUDENTS',
  LOAD_STUDENTS_SUCCESS = '[STUDENT] LOAD STUDENTS SUCCESS',
  LOAD_STUDENTS_FAIL = '[STUDENT] LOAD STUDENTS FAIL',
  LOAD_STUDENT = '[STUDENT] LOAD STUDENT',
  LOAD_STUDENT_SUCCESS = '[STUDENT] LOAD STUDENT SUCCESS',
  LOAD_STUDENT_FAIL = '[STUDENT] LOAD STUDENT FAIL',
  CREATE_STUDENT = '[STUDENT] CREATE STUDENT',
  CREATE_STUDENT_SUCCESS = '[STUDENT] CREATE STUDENT SUCCESS',
  CREATE_STUDENT_FAIL = '[STUDENT] CREATE STUDENT FAIL',
  UPDATE_STUDENT = '[STUDENT] UPDATE STUDENT',
  UPDATE_STUDENT_SUCCESS = '[STUDENT] UPDATE STUDENT SUCCESS',
  UPDATE_STUDENT_FAIL = '[STUDENT] UPDATE STUDENT FAIL',
  DELETE_STUDENT = '[STUDENT] DELETE STUDENT',
  DELETE_STUDENT_SUCCESS = '[STUDENT] DELETE STUDENT SUCCESS',
  DELETE_STUDENT_FAIL = '[STUDENT] DELETE STUDENT FAIL',
}
export class LoadStudents implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENTS;
}
export class LoadStudentsSuccess implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENTS_SUCCESS;
  constructor(public payload: Student[]) {}
}
export class LoadStudentsFail implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENTS_FAIL;
  constructor(public payload: string) {}
}
export class LoadStudent implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT;
  constructor(public payload: number) {}
}
export class LoadStudentSuccess implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_SUCCESS;
  constructor(public payload: any) {}
}
export class LoadStudentFail implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_FAIL;
  constructor(public payload: string) {}
}
export class CreateStudent implements Action {
  readonly type = StudentActionTypes.CREATE_STUDENT;
  constructor(public payload: Student) {}
}
export class CreateStudentSuccess implements Action {
  readonly type = StudentActionTypes.CREATE_STUDENT_SUCCESS;
  constructor(public payload: Student) {}
}
export class CreateStudentFail implements Action {
  readonly type = StudentActionTypes.CREATE_STUDENT_FAIL;
  constructor(public payload: string) {}
}
export class UpdateStudent implements Action {
  readonly type = StudentActionTypes.UPDATE_STUDENT;
  constructor(public payload: Student) {}
}
export class UpdateStudentSuccess implements Action {
  readonly type = StudentActionTypes.UPDATE_STUDENT_SUCCESS;
  constructor(public payload: Update<Student>) {}
}
export class UpdateStudentFail implements Action {
  readonly type = StudentActionTypes.UPDATE_STUDENT_FAIL;
  constructor(public payload: string) {}
}
export class DeleteStudent implements Action {
  readonly type = StudentActionTypes.DELETE_STUDENT;
  constructor(public payload: number) {}
}
export class DeleteStudentSuccess implements Action {
  readonly type = StudentActionTypes.DELETE_STUDENT_SUCCESS;
  constructor(public payload: number) {}
}
export class DeleteStudentFail implements Action {
  readonly type = StudentActionTypes.DELETE_STUDENT_FAIL;
  constructor(public payload: string) {}
}
export type Actions =
  | LoadStudents
  | LoadStudentsSuccess
  | LoadStudentsFail
  | LoadStudent
  | LoadStudentSuccess
  | LoadStudentFail
  | CreateStudent
  | CreateStudentSuccess
  | CreateStudentFail
  | UpdateStudent
  | UpdateStudentSuccess
  | UpdateStudentFail
  | DeleteStudent
  | DeleteStudentSuccess
  | DeleteStudentFail;
