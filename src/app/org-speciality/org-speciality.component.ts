import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService, Speciality } from '../organogram.service';
import { BarChart, Bar } from '../compact-bar/compact-bar.component';

@Component({
  selector: 'app-org-speciality',
  templateUrl: './org-speciality.component.html',
  styleUrls: ['./org-speciality.component.css']
})
export class OrgSpecialityComponent implements OnInit {
  @Input() speciality_type: string;
  public speciality: Speciality;
  public bar_chart: BarChart;

  constructor(private _organogramService: OrganogramService) { }

  ngOnInit() {
    this.setSpeciality(this._organogramService.getSpeciality(this.speciality_type));
  }

  setSpeciality(speciality: Speciality){
    this.speciality = speciality;
    this.bar_chart = {axis_value: 10,
                     bars: [{label: 'Doctors', num: speciality.doctors},
                            {label: 'Board Certified', num: speciality.dr_board},
                            {label: 'Internal', num: speciality.dr_internal},
                            {label: 'CME', num: speciality.dr_cme},
                            {label: 'Priv', num: speciality.dr_priv}]};
  }

}
