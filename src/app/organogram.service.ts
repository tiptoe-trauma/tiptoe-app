import { Injectable } from '@angular/core';

export interface Speciality {
  name: string;
  properties?: string[];
  doctors: number;
  dr_board: number;
  dr_internal: number;
  dr_cme: number;
  dr_priv: number;

}

@Injectable()
export class OrganogramService {

  constructor() { }

  public getSpeciality(stype: string): Speciality{
    let ret: Speciality = {
      name: 'Anesthesiology',
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

  }

}
