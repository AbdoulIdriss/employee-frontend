import { Component, OnInit } from '@angular/core';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
import { ModelComponent } from '../shared/ui/model/model.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee!: IEmployee

  constructor(private employeeService: EmployeeService,
  ){}

  ngOnInit(): void {
    this.getAllEmployees();   
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next: (response)=>{
        console.log(response);       
        this.employees = response.data;       
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  loadEmployee(data: IEmployee){
    this.employee = data;
    this.openModel();
  }

  deleteEmployee(id: string){
    this.employeeService.deleteEmployee(id).subscribe({
      next:(response) =>{
        this.getAllEmployees()
      },
            error: (err) => {
        console.error(err)
      }
    })
  }

  openModel(){
    this.isModelOpen = true;
  }
 
  closeModel(){
    this.isModelOpen = false;
    this.getAllEmployees();  
  }

}
