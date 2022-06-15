import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeData: any = {};
  employeeResourceData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }
  
  id = this.actRoute.snapshot.params['id'];

  ngOnInit() {
    this.restApi
    .getEmployee(this.id)
    .pipe(
      concatMap((data: Employee) => {
        this.employeeData = data;
        return this.restApi.getEmployeeResource(this.id);
      })
    )
    .subscribe((result: Employee) => {
      this.employeeResourceData = result;
    });
  }
}
