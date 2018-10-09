import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService } from '../services/organogram.service';
import { UserService } from '../services/user.service';
import { Bar, BarChart } from '../compact-bar/compact-bar.component';

@Component({
  selector: 'app-org-joyplot',
  templateUrl: './org-joyplot.component.html',
  styleUrls: ['./org-joyplot.component.css']
})
export class OrgJoyplotComponent implements OnInit {
  public stats: object;
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
      .subscribe(stats => this.populateBarCharts(stats));
  }

  private pushValue(bars: Bar[], value: string, jn: object): number{
    bars.push({'label': value, 'num': jn[value] * 100});
    return jn[value];
  }

  populateBarCharts(stats: object){
    this.stats = stats;
    this.bars = [];
    if(Object.keys(stats).includes('user_org')){
      let jn = stats['user_org'];
      let barchart = <BarChart>{};
      barchart.axis_value = 100;
      barchart.bars = [];
      barchart.name = "You"
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
    if(Object.keys(stats).includes('certified_orgs')){
      let jn = stats['certified_orgs'];
      let barchart = <BarChart>{};
      barchart.axis_value = 100;
      barchart.bars = [];
      barchart.name = "Verified"
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
