import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Student } from '../student.model';
import * as StudentActions from '../state/student.actions';
import * as fromStudent from '../state/student.reducer';
import { Observable } from 'rxjs';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css'],
})
export class EditStudentsComponent implements OnInit {
  studentUpdateForm: FormGroup;
  totalStudents: any;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromStudent.AppState>,
    public publicService: PublicService
  ) {}

  ngOnInit() {
    this.studentUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      id: null,
    });

    // subscribing to the getCurrentStudent from reducer returns getStudentById()
    const student$: Observable<any> = this.store.select(
      fromStudent.getCurrentStudent
    );

    setTimeout(() => {
      student$.subscribe((currentStudent) => {
        // console.log(currentStudent);
        if (currentStudent) {
          console.log(currentStudent);
          this.studentUpdateForm.patchValue({
            name: currentStudent.name,
            email: currentStudent.email,
            address: currentStudent.address,
            age: currentStudent.age,
            dob: currentStudent.dob ? currentStudent.dob.split('T') : '',
            id: currentStudent.id,
          });
        }
      });
    }, 0);
  }

  // updating selected student
  updateStudents() {
    if (this.studentUpdateForm.get('dob').value == 0) {
      // this.publicService.presentToast('Form is Invalid.');
      this.publicService.presentAlerts("Age can't be 0");
      return;
    } else if (this.studentUpdateForm.invalid) {
      this.publicService.presentAlerts('The form you submitted is invalid.');
    }
    const updatedStudent: Student = {
      name: this.studentUpdateForm.get('name').value,
      address: this.studentUpdateForm.get('address').value,
      email: this.studentUpdateForm.get('email').value,
      age: this.studentUpdateForm.get('age').value,
      dob: this.studentUpdateForm.get('dob').value,
      id: this.studentUpdateForm.get('id').value,
    };
    this.store.dispatch(new StudentActions.UpdateStudent(updatedStudent));
    this.studentUpdateForm.reset();
    this.publicService.presentToast('Student Updated Successfully.');
  }

  calculateAge() {
    var dob = new Date(this.studentUpdateForm.get('dob').value);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    this.studentUpdateForm.patchValue({
      age: age,
    });
  }

  changeSection() {
    this.publicService.isAddSection = true;
  }
}
