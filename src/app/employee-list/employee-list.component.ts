import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})

export class EmployeeListComponent implements OnInit {
  
  Employee: any = [];
  p: number = 1;
  constructor(public restApi: RestApiService) {}

  ngOnInit() {
    this.loadEmployees(this.p);
  }

  // Get employees list
  loadEmployees(page: number) {
    return this.restApi.getEmployees(page)
      .subscribe((data: Employee) => {
      this.Employee = data;
    });
  }

  // For pagination
  getPage(page: number) {
    this.loadEmployees(page);
  }
}