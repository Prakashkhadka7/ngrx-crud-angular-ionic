import { Student } from '../student.model';
import * as fromRoot from '../state/app-state';
import * as StudentActions from './student.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
export const studentFeatureKey = 'students';

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
  selectedStudentId: number | null;
  // Students: Student[];
  // entities: any;
  selectedStudentList:any;
  loading: boolean;
  loaded: boolean;
  error: string;
}
// export function selectUserId(a: Student): number {
//   //In this case this would be optional since primary key is id
//   return a.id;
// }

export interface AppState extends fromRoot.AppState {
  students: StudentState;
}
// export const initialState: StudentState = {
//   Students: [],
//   loading: false,
//   loaded: false,
//   error: '',
// };
export const studentAdapter : EntityAdapter<Student>=
  createEntityAdapter<Student>(
    // selectId: selectUserId
  );
  // export const initialState = studentAdapter.getInitialState({
  //   error: undefined,
  //   selectedStudentId: null,
  //   selectedStudentList: {}
  // });
export const initialState:  StudentState = studentAdapter.getInitialState({
  // ids: [],
  selectedStudentId: null,
  selectedStudentList: {},
  loading: false,
  loaded: false,
  error: '',
});


// export const initialState = studentAdapter.getInitialState(defaultStudent);

export function studentReducer(
  state = initialState,
  action: StudentActions.Actions
): StudentState {
  switch (action.type) {
    case StudentActions.StudentActionTypes.LOAD_STUDENTS_SUCCESS: {
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
    case StudentActions.StudentActionTypes.LOAD_STUDENTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case StudentActions.StudentActionTypes.LOAD_STUDENT_SUCCESS: {
      return studentAdapter.addOne(action.payload, {
        ...state,
        selectedStudentId: action.payload.id,
        selectedStudentList: action.payload

      });
    }
    case StudentActions.StudentActionTypes.LOAD_STUDENT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case StudentActions.StudentActionTypes.CREATE_STUDENT_SUCCESS: {
      return studentAdapter.addOne(action.payload, state);
    }
    case StudentActions.StudentActionTypes.CREATE_STUDENT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case StudentActions.StudentActionTypes.UPDATE_STUDENT_SUCCESS: {
      return studentAdapter.updateOne(action.payload, state);

    }
    case StudentActions.StudentActionTypes.UPDATE_STUDENT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case StudentActions.StudentActionTypes.DELETE_STUDENT_SUCCESS: {
      return studentAdapter.removeOne(action.payload, state);
    }
    case StudentActions.StudentActionTypes.DELETE_STUDENT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const getStudentFeatureState = createFeatureSelector<StudentState>(
  "students"
);

export const getStudents = createSelector(
  getStudentFeatureState,
  studentAdapter.getSelectors().selectAll
);

export const getStudentsLoading = createSelector(
  getStudentFeatureState,
  (state: StudentState)=> state.loading
);
export const getStudentsLoaded = createSelector(
  getStudentFeatureState,
  (state: StudentState)=> state.loaded
);

export const getError = createSelector(
  getStudentFeatureState,
  (state: StudentState)=> state.error
);

export const getCurrentStudentId = createSelector(
  getStudentFeatureState,
  (state: StudentState) => state.selectedStudentId
)
export const getCurrentStudent = createSelector(
  getStudentFeatureState,
  getCurrentStudentId,
  state => state.selectedStudentList
)
