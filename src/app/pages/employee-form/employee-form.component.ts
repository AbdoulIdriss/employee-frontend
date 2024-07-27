import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnChanges{
  @Input() data: IEmployee | null = null; 
  @Output() onCloseModel = new EventEmitter();

  employeeForm!: FormGroup

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService
  ){
    this.employeeForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ] ),
      email: new FormControl ('', [
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl ('', [Validators.required]),
      dob: new FormControl ('', [Validators.required]),
      doj: new FormControl ('', [Validators.required]),
    })
  }

  onClose(){
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.employeeForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        mobile: this.data.mobile,
        dob: formatDate(this.data.dob, 'yyyy-MM-dd', 'en'),
        doj: this.data.doj,
      });
    }
  }


  onSubmit(){
    
    if (this.employeeForm.valid) {

      if (this.data) {
          this.employeeService.updateEmployee(this.data._id as string, this.employeeForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetEmployeeForm();
            },
          });
      } else {
        this.employeeService.createEmployee(this.employeeForm.value).subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
          },
        });
      }this.resetEmployeeForm()
      console.log(this.data);
      
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.onClose();
  }

}
