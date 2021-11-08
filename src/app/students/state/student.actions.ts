import { Action } from '@ngrx/store';
import { Student } from '../student.model';

export enum StudentActionTypes {
  LOAD_STUDENTS = '[STUDENT] LOAD STUDENTS',
  LOAD_STUDENT_SUCCESS = '[STUDENT] LOAD STUDENT SUCCESS',
  LOAD_STUDENT_FAIL = '[STUDENT] LOAD STUDENT FAIL',
}
export class LoadStudents implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENTS;
}
export class LoadStudentsSuccess implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_SUCCESS;
  constructor(public payload: Student[]) {}
}
export class LoadStudentsFail implements Action {
  readonly type = StudentActionTypes.LOAD_STUDENT_FAIL;
  constructor(public payload: string) {}
}
export type Actions = LoadStudents | LoadStudentsSuccess | LoadStudentsFail;
