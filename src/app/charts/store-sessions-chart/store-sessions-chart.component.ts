import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { LinkedInService } from '../../services/linkedin.service';

@Component({
  selector: 'app-store-sessions-chart',
  templateUrl: './store-sessions-chart.component.html',
  styleUrls: ['./store-sessions-chart.component.css']
})
export class StoreSessionsChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Followers'},
  ];

  //public data: LImodel[] = [];
  isLoadingData = true;


  constructor(private linkedinService: LinkedInService){}

  ngOnInit() {
    this.getLinkedInData();
  }

  async getLinkedInData() {
    this.isLoadingData = true;
    try {
      const results = await this.linkedinService.getNewLinkedInData();
      results.forEach(li => {
        this.barChartData[0].data.push(li.followerCount);
        this.barChartLabels.push(li.name);
        });
        console.log(this.barChartLabels);
    } catch (err) {
      console.log(err);
      this.isLoadingData = false;
    }
  }
}
