import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Student } from '../student.model';
import * as StudentActions from '../state/student.actions';
import * as fromStudent from '../state/student.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css'],
})
export class EditStudentsComponent implements OnInit {
  studentUpdateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromStudent.AppState>
  ) {}

  ngOnInit() {
    this.studentUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
    });
    const students$: Observable<Student> = this.store.select(
      fromStudent.getCurrentStudent
    );


setTimeout(() => {
  students$.subscribe((currentStudent) => {
    console.log(currentStudent)
    if (currentStudent) {
      this.studentUpdateForm.patchValue({
        name: currentStudent[0].name,
        email: currentStudent[0].email,
        address: currentStudent[0].address,
        phone: currentStudent[0].phone,
        age: currentStudent[0].age,
        dob: currentStudent[0].dob,
        id: currentStudent[0].id,
      });
    }
  });
}, 2000);


  }

  updateStudents() {
    const updatedStudent: Student = {
      name: this.studentUpdateForm.get('name').value,
      address: this.studentUpdateForm.get('address').value,
      phone: this.studentUpdateForm.get('phone').value,
      email: this.studentUpdateForm.get('email').value,
      age: this.studentUpdateForm.get('age').value,
      dob: this.studentUpdateForm.get('dob').value,
      // id: this.studentUpdateForm.get('id').value,
    };
    this.store.dispatch(new StudentActions.UpdateStudent(updatedStudent));
  }
}
