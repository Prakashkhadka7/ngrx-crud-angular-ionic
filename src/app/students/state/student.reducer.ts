import { Student } from '../student.model';
import * as fromRoot from '../state/app-state';
import * as StudentActions from './student.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface StudentState extends EntityState<Student> {
  selectedStudentId: number | null;
  selectedStudentList: any;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  students: StudentState;
}

export const studentAdapter: EntityAdapter<Student> =
  createEntityAdapter<Student>();

//defining initial Default state.
export const initialState: StudentState = studentAdapter.getInitialState({
  selectedStudentId: null,
  selectedStudentList: {},
  loading: false,
  loaded: false,
  error: '',
});

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
    }
    case StudentActions.StudentActionTypes.LOAD_STUDENTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case StudentActions.StudentActionTypes.LOAD_STUDENT_SUCCESS: {
      return studentAdapter.addOne(action.payload, {
        ...state,
        selectedStudentId: action.payload.id,
        selectedStudentList: action.payload,
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

const getStudentFeatureState = createFeatureSelector<StudentState>('students');

export const getStudents = createSelector(
  getStudentFeatureState,
  studentAdapter.getSelectors().selectAll
);

export const getStudentsLoading = createSelector(
  getStudentFeatureState,
  (state: StudentState) => state.loading
);
export const getStudentsLoaded = createSelector(
  getStudentFeatureState,
  (state: StudentState) => state.loaded
);

export const getError = createSelector(
  getStudentFeatureState,
  (state: StudentState) => state.error
);

export const getCurrentStudentId = createSelector(
  getStudentFeatureState,
  (state: StudentState) => state.selectedStudentId
);
export const getCurrentStudent = createSelector(
  getStudentFeatureState,
  getCurrentStudentId,
  (state) => state.selectedStudentList
);
