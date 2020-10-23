import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../services/app-config.service';
import { LImodel } from '../company-followers/models';

@Injectable({
  providedIn: 'root'
})

export class LinkedInService{

  url = 'https://phantombuster.s3.amazonaws.com/VnwU251T9SI/dtpNatXh40RAQTxDMLzF0g/LinkedInPhantomResults.json';

  constructor(private http: HttpClient, private conf: AppConfigService) {
    //this.url = conf.getConfig().DataURL;
  }

  async getNewLinkedInData(): Promise<LImodel[]> {
    try {
      const results = await this.http.get<LImodel[]>(this.url).toPromise();
      console.log(results);
      return results;
    } catch(error) {
      return Promise.reject("error");
    }
  }
}
