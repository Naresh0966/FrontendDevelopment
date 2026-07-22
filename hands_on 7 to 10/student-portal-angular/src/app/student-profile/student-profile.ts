import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfileComponent {

  studentForm;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {

    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });

    this.resetForm();
  }

  onSubmit() {

    if (this.studentForm.valid) {

      this.submittedData = this.studentForm.value;

      console.log(this.submittedData);

      alert('Profile Submitted Successfully!');
    }

  }

  resetForm() {

    this.studentForm.reset({
      name: 'Naresh',
      email: 'naresh@example.com',
      department: 'Computer Science Engineering'
    });

    this.submittedData = null;
  }

}