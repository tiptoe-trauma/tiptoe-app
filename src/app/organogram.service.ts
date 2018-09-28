import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

export interface Speciality {
  name: string;
  properties?: string[];
  doctors?: number;
  dr_board?: number;
  dr_internal?: number;
  dr_cme?: number;
  dr_priv?: number;

}

export interface JoyPlotNumbers {
  id: number;
  trauma_backup: boolean;
  trauma_backup_approved: boolean;
  ortho_number: boolean;
  ortho_liason: boolean;
  ortho_number_meetings: boolean;
  ortho_residency: boolean;
  ortho_fellowship: boolean;
  neuro_number: boolean;
  neuro_liason: boolean;
  neuro_number_meetings: boolean;
  neuro_residency: boolean;
  anesth_number: boolean;
  anesth_liason: boolean;
  general_atls_once: number;
  general_atls_current: number;
  trauma_priv: number;
  trauma_panel: number;
  trauma_cme: number;
  trauma_board_eligible: number;
  trauma_board_certified: number;
  trauma_exclusive: number;
  trauma_critical_certifications: number;
  trauma_fellowship: number;
  ortho_panel: number;
  ortho_cme: number;
  ortho_board_eligible: number;
  ortho_board_certified: number;
  ortho_exclusive: number;
  neuro_panel: number;
  neuro_cme: number;
  neuro_board_eligible: number;
  neuro_board_certified: number;
  neuro_exclusive: number;
  anesth_panel: number;
  anesth_board_certified: number;
  anesth_residency: number
}

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

  public getJoyplot(token: string) {
    let headers = new Headers({'Accept': 'application/json',
                               'Authorization': 'Token ' + token });
    let options = new RequestOptions({headers: headers});
    return this._http.get('/api/joyplot', options)
                        .map(res => <JoyPlotNumbers[]> res.json())
  }

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
