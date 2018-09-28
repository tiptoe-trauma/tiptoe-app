import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService, JoyPlotNumbers } from '../organogram.service';
import { UserService } from '../user.service';
import { Bar, BarChart } from '../compact-bar/compact-bar.component';

@Component({
  selector: 'app-org-joyplot',
  templateUrl: './org-joyplot.component.html',
  styleUrls: ['./org-joyplot.component.css']
})
export class OrgJoyplotComponent implements OnInit {
  public joynums: object;
  public bars: BarChart[];
  public max_value: number;
  public axises: number[];
  @Input() public speciality: string;

  constructor(private _organogramService: OrganogramService,
              private _userService: UserService) { }

  ngOnInit() {
    this.bars = [];
    this.updateNumbers(this.speciality);
  }

  public updateNumbers(speciality: string){
    this.speciality = speciality;
    let token = this._userService.token;
    this._organogramService.getSpecialityStats(token, this.speciality)
      .subscribe(joynums => this.populateBarCharts(joynums));
  }

  private pushValue(bars: Bar[], value: string, jn: JoyPlotNumbers): number{
    bars.push({'label': value, 'num': jn[value] * 100});
    return jn[value];
  }

  populateBarCharts(joynums: object){
    this.joynums = joynums;
    this.bars = [];
    if(Object.keys(joynums).includes('user_org')){
      let jn = joynums['user_org'];
      let barchart = <BarChart>{};
      barchart.axis_value = 100;
      barchart.bars = [];
      this.max_value = 100;
      for(let key of Object.keys(jn)){
        this.pushValue(barchart.bars, key, jn);
      }
      this.bars.push(barchart);
      this.axises = [this.max_value,
                     Math.ceil(this.max_value * .8),
                     Math.ceil(this.max_value * .6),
                     Math.ceil(this.max_value * .3),
                     Math.ceil(this.max_value * .2)];
    }
    if(Object.keys(joynums).includes('certified_orgs')){
      let jn = joynums['certified_orgs'];
      let barchart = <BarChart>{};
      barchart.axis_value = 100;
      barchart.bars = [];
      this.max_value = 100;
      for(let key of Object.keys(jn)){
        this.pushValue(barchart.bars, key, jn);
      }
      this.bars.push(barchart);
      this.axises = [this.max_value,
                     Math.ceil(this.max_value * .8),
                     Math.ceil(this.max_value * .6),
                     Math.ceil(this.max_value * .3),
                     Math.ceil(this.max_value * .2)];
    }
  }

}
