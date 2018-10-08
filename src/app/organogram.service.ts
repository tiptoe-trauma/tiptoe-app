import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

export interface TMDStats {
  organization: string;
  medical_speciality: string;
  reporting: string[];
  trauma_call: boolean;
  lead_qi: boolean;
  tpm_perf_eval: boolean;
  qualifications_trauma_panel: boolean;
  appoint_trauma_panel: boolean;
  fire_trauma_panel: boolean;
}

export interface TPMStats {
  continuing_education: boolean;
  organization: string;
  coordinating_quality_improvement: boolean;
  education_level: string;
  evaluating_nursing: boolean;
  certifications: string[];
  reporting: string[];
}

@Injectable()
export class OrganogramService {

  constructor(private _http: Http) { }

  public getSpecialityStats(token: string, speciality: string){
    let headers = new Headers({'Accept': 'application/json',
                               'Authorization': 'Token ' + token });
    let options = new RequestOptions({headers: headers});
    return this._http.get('/api/stats/' + speciality, options)
                        .map(res => res.json())
  }

  public getSpecialityPolicies(token: string, speciality: string){
    let headers = new Headers({'Accept': 'application/json',
                               'Authorization': 'Token ' + token });
    let options = new RequestOptions({headers: headers});
    return this._http.get('/api/policies/' + speciality, options)
                        .map(res => res.json())
  }

  public getTMDStats(token: string) {
    let headers = new Headers({'Accept': 'application/json',
                               'Authorization': 'Token ' + token });
    let options = new RequestOptions({headers: headers});
    return this._http.get('/api/tmd_stats', options)
                        .map(res => <TMDStats> res.json())
  }

  public getTPMStats(token: string) {
    let headers = new Headers({'Accept': 'application/json',
                               'Authorization': 'Token ' + token });
    let options = new RequestOptions({headers: headers});
    return this._http.get('/api/tpm_stats', options)
                        .map(res => <TPMStats> res.json())
  }
}
