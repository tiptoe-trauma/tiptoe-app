import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService, Speciality } from '../organogram.service';

@Component({
  selector: 'app-org-speciality',
  templateUrl: './org-speciality.component.html',
  styleUrls: ['./org-speciality.component.css']
})
export class OrgSpecialityComponent implements OnInit {
  @Input() speciality_type: string;
  private speciality: Speciality;

  constructor(private _organogramService: OrganogramService) { }

  ngOnInit() {
    this.speciality = this._organogramService.getSpeciality(this.speciality_type);
    console.log(this.speciality);
  }

}
