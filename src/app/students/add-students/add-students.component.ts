import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as StudentActions from '../state/student.actions';
import { Student } from '../student.model';
import * as fromStudent from '../state/student.reducer';
import { CreateStudent } from '../state/student.actions';
import { PublicService } from '../../services/public.service';
import { getStudents } from '../state/student.reducer';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'],
})
export class AddStudentsComponent implements OnInit {
  studentsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromStudent.AppState>,
    public publicService: PublicService
  ) {}

  ngOnInit() {
    this.studentsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      address: [''],
      age: ['', Validators.required],
      dob: [''],
    });
  }

  createStudents() {
    if (this.studentsForm.get('age').value == 0) {
      // this.publicService.presentToast('Form is Invalid.');
      this.publicService.presentAlerts("Age can't be 0");
      return;
    } else if (this.studentsForm.invalid) {
      this.publicService.presentAlerts('The form you submitted is invalid.');
    }
    const newStudent: Student = {
      name: this.studentsForm.get('name').value,
      address: this.studentsForm.get('address').value,
      email: this.studentsForm.get('email').value,
      age: this.studentsForm.get('age').value,
      dob: this.studentsForm.get('dob').value,
    };
    this.store.dispatch(new StudentActions.CreateStudent(newStudent));
    this.studentsForm.reset();
    this.publicService.presentToast('Student added Successfully.');

  }

  calculateAge() {
    var dob = new Date(this.studentsForm.get('dob').value);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    this.studentsForm.patchValue({
      age: age,
    });
  }
}
