import { Component, OnInit } from '@angular/core';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(public publicService: PublicService) { }

  ngOnInit(): void {
  }

}
