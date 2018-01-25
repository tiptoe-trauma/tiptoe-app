import { Injectable } from '@angular/core';

export interface Speciality {
  name: string;
  properties?: string[];
  doctors?: number;
  dr_board?: number;
  dr_internal?: number;
  dr_cme?: number;
  dr_priv?: number;

}

@Injectable()
export class OrganogramService {

  constructor() { }

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
