import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as StudentActions from '../state/student.actions';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import * as fromStudent from '../state/student.reducer';
import { AppState } from '../state/student.reducer';
import { state } from '@angular/animations';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  stud: any;
  student$!: Observable<Student[]>;
  error$!: Observable<String>;
  tempVariable!: Student[];
  constructor(
    private store: Store<Student>,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new StudentActions.LoadStudents());
    this.student$ = this.store.pipe(select(fromStudent.getStudents));

    setTimeout(() => {
      this.student$.subscribe((res) => (this.tempVariable = res));
      console.log('value of tempVariable', this.tempVariable);
    }, 900);
  }
}
