import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { json } from 'd3';

import { BaseService } from "../../../../provide/base-service";
import { DataService } from "../../../../provide/data-service";

@Component({
  selector: 'ms-view-organizor',
  templateUrl: './view-organizor.component.html',
  styleUrls: ['./view-organizor.component.scss']
})
export class ViewOrganizorComponent implements OnInit {

  page_title: string = 'View Organizor';
  url: string;
  orgList: Element[];
  displayedColumns = ['name', 'person', 'email', 'phone', 'state', 'symbol'];
  dataSource: any;
  isLoading: boolean;

  constructor(
    public router: Router,
    public baseService: BaseService,
    public dataService: DataService
  ) {
   }

  ngOnInit() {
  this.url = this.baseService.organizorURL;
  this.getOrgList();
  }

  getOrgList(){
    this.isLoading = true;
    this.dataService.getData(this.url)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('orgData', data);
          this.orgList = data;
          this.dataSource = new MatTableDataSource(this.orgList);
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  edit(item: any) {
    this.router.navigate(['dashboard/organizor-manage/add-organizor', { item: item._id }]);
  }

  delete(item) {
    this.isLoading = true;
    this.dataService.deleteData(this.url, item._id)
      .subscribe(
        (data) => {
          console.log('orgData', data);
          this.getOrgList();
          return true;
        },
        error => {
          this.isLoading = false;
          console.log('errorData', error);
          return true;
        }
      )
  }

}
