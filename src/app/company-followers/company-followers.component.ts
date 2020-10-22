import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
//import { CompanyFollowersDataSource } from './company-followers-datasource';
import { LinkedInService } from '../services/linkedin.service';
import { LImodel } from './models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-followers',
  templateUrl: './company-followers.component.html',
  styleUrls: ['./company-followers.component.css']
})
export class CompanyFollowersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<LImodel>;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public data: LImodel[] = [];
  displayedColumns = ['name', 'followerCount'];
  isLoadingData = true;
  dataSource: MatTableDataSource<LImodel>;

  constructor(private linkedinService: LinkedInService, private router: Router){}

  ngOnInit() {
    this.getLinkedInData();
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }

  async getLinkedInData() {
    this.isLoadingData = true;
    try {
      const results = await this.linkedinService.getNewLinkedInData();
      this.data = results;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.isLoadingData = false;
    } catch (err) {
      console.log(err);
      this.isLoadingData = false;
    }
  }
}
