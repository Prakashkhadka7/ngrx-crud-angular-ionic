import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as StudentActions from '../state/student.actions';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import * as fromStudent from '../state/student.reducer';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  stud: any;
  students$!: Observable<Student[]>;
  error$!: Observable<String>;
  tempVariable!: Student[];
  cp: number;
  totalStudents: number;
  constructor(
    private store: Store<fromStudent.AppState>
  ) {}

  ngOnInit(): void {
    // this.cp = 1;
    this.store.dispatch(new StudentActions.LoadStudents());
    this.students$ = this.store.pipe(select(fromStudent.getStudents));
    this.error$ = this.store.pipe(select(fromStudent.getError));
    // console.log(this.student$);
    setTimeout(() => {
      this.students$.subscribe((res) => (this.tempVariable = res));
      this.totalStudents = this.tempVariable.length;
    }, 2000);
  }

  deleteStudent(student: Student) {
    if (confirm('Are you sure you want to Delete the User?')) {
      this.store.dispatch(new StudentActions.DeleteStudent(student.id));
    }
  }

  editStudent(student: Student) {
    // console.log(student.id);
    this.store.dispatch(new StudentActions.LoadStudent(student.id));
  }
}
