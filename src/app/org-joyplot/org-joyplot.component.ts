import { Component, OnInit } from '@angular/core';
import { OrganogramService, JoyPlotNumbers } from '../organogram.service';

@Component({
  selector: 'app-org-joyplot',
  templateUrl: './org-joyplot.component.html',
  styleUrls: ['./org-joyplot.component.css']
})
export class OrgJoyplotComponent implements OnInit {
  public joynums: JoyPlotNumbers[];

  constructor(private _organogramService: OrganogramService) { }

  ngOnInit() {
    this._organogramService.getJoyplot()
      .subscribe(joynums => this.joynums = joynums);
  }

}
