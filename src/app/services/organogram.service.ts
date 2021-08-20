import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  public getSpecialityStats(token: string, speciality: string){
    let options = { headers: new HttpHeaders(
                                {Authorization: 'Token ' + token })
                   };
    return this.http.get('/api/stats/' + speciality, options);
  }

  public getSpecialityPolicies(token: string, speciality: string){
    let options = { headers: new HttpHeaders(
                                {Authorization: 'Token ' + token })
                   };
    return this.http.get('/api/policies/' + speciality, options);
  }

  public getTMDStats(token: string) {
    let options = { headers: new HttpHeaders(
                                {Authorization: 'Token ' + token })
                   };
    return this.http.get<TMDStats>('/api/tmd_stats', options);
  }

  public getTPMStats(token: string) {
    let options = { headers: new HttpHeaders(
                                {Authorization: 'Token ' + token })
                   };
    return this.http.get<TPMStats>('/api/tpm_stats', options);
  }

  public getPercentStats(token: string, category: string){
    let options = { headers: new HttpHeaders(
                                {Authorization: 'Token ' + token })
                  };
    return this.http.get('/api/percent_yes/' + category, options);
  }

  public getAnswers(token: string, category: string){
    let options = { headers: new HttpHeaders(
                                {Authorization: 'Token ' + token })
                  };
    
    return this.http.get('api/answers/' + category, options);
  }

  public runQuery(token: string, query: string){
    let options = {}
    let encodedQuery = encodeURIComponent(query);
    return this.http.get('api/run_query/?query=' + encodedQuery, options);
  }
}
