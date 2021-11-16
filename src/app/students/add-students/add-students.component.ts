import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as StudentActions from '../state/student.actions';
import { Student } from '../student.model';
import * as fromStudent from '../state/student.reducer';
import { CreateStudent } from '../state/student.actions';
import { PublicService } from '../../services/public.service';


@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {


  studentsForm:  FormGroup;
  constructor(private formBuilder:FormBuilder,private store: Store<fromStudent.AppState>,public publicService: PublicService) {}

  ngOnInit() {
this.studentsForm = this.formBuilder.group({
  name: ['',Validators.required],
  email: ['',Validators.email],
  address: [''],
  phone: ['',Validators.required],
  age: ['',Validators.required],
  dob: [''],

})
  }

  createStudents(){
  if(this.studentsForm.invalid){
    this.publicService.presentToast('Form is Invalid.');
    return
  }
    const newStudent: Student = {
      name: this.studentsForm.get("name").value,
      address: this.studentsForm.get('address').value,
      phone: this.studentsForm.get('phone').value,
      email: this.studentsForm.get('email').value,
      age: this.studentsForm.get('age').value,
      dob: this.studentsForm.get('dob').value,
    };
    this.store.dispatch( new StudentActions.CreateStudent(newStudent))
    this.studentsForm.reset();
    this.publicService.presentToast('Student added Successfully.');

  }

  calculateAge(event){
    return console.log((event.target as HTMLInputElement).value);
  }
}
