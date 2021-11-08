import { Student } from '../student.model';
import * as fromRoot from '../state/app-state';
import * as StudentActions from './student.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

//  export const initialState: StudentState ={
//   students:{
//     name:"Prakash",
//     phone:"986757975",
//     address:"suncity apartment",
//     membership:"Platinum"
//   }
// }
// export interface StudentState{
//   Students: Student[],
//   loading:boolean,
//   loaded:boolean,
//   error:string
// }
export interface StudentState extends EntityState<Student> {
  Students: Student[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  students: StudentState;
}
// export const initialState: StudentState = {
//   Students: [],
//   loading: false,
//   loaded: false,
//   error: '',
// };
export const defaultStudent: StudentState = {
  ids: [],
  entities: {},
  // selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: '',
  Students: [],
};

export const studentAdapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialState = studentAdapter.getInitialState(defaultStudent);

export function studentReducer(
  state = initialState,
  action: StudentActions.Actions
): StudentState {
  switch (action.type) {
    case StudentActions.StudentActionTypes.LOAD_STUDENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case StudentActions.StudentActionTypes.LOAD_STUDENT_SUCCESS: {
      return studentAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
      // return {
      //   ...state,
      //   loading: false,
      //   loaded: false,
      //   Students: action.payload,
      // };
    }
    case StudentActions.StudentActionTypes.LOAD_STUDENT_FAIL: {
      return {
        ...state,
        Students: [],
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const getStudentFeatureState = createFeatureSelector<StudentState>('students');

export const getStudents = createSelector(
  getStudentFeatureState,
  studentAdapter.getSelectors().selectAll
);
