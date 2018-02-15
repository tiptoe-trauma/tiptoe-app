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

@Injectable()
export class OrganogramService {

  constructor(private _http: Http) { }

  public getJoyplot() {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.get('/api/joyplot', options)
                        .map(res => <JoyPlotNumbers[]> res.json())
  }

  public getSpeciality(stype: string): Speciality{
    if(stype === 'trauma_surgery') {
      let ret: Speciality = {
        name: 'Trauma Surgery',
        properties: [
          '24/7 coverage',
          'Designated liaison to trauma'
        ],
        doctors: 3,
        dr_cme: 3,
        dr_priv: 1
      };
      return ret;
    } else if(stype === 'surgery') {
      let ret: Speciality = {
        name: 'General Surgery',
        properties: [
          '24/7 coverage',
          'Backup plan',
          'Trauma QI program',
          'Designated liaison to trauma'
        ],
        doctors: 5,
        dr_board: 4,
        dr_internal: 2,
        dr_cme: 3,
        dr_priv: 1
      };
      return ret;
    } else if(stype === 'orthopedic') {
      let ret: Speciality = {
        name: 'Orthopedic Surgery',
        properties: [
          'Backup plan',
          'Designated liaison to trauma'
        ],
        doctors: 3,
        dr_board: 2,
        dr_internal: 2
      };
      return ret;
    } else if(stype === 'neurosurgery') {
      let ret: Speciality = {
        name: 'Neurosurgery',
        properties: [
          'Designated liaison to trauma'
        ],
        doctors: 1
      };
      return ret;
    } else if(stype === 'anesthesiology'){
      let ret: Speciality = {
        name: 'Anesthesiology',
        properties: [
          'Backup plan',
          'Trauma QI program'
        ],
        doctors: 2,
        dr_board: 1
      };
      return ret;
    }
  }
}
