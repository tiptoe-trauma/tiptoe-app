import { Component, OnInit } from '@angular/core';
import { OrganogramService, JoyPlotNumbers } from '../organogram.service';
import { Bar, BarChart } from '../compact-bar/compact-bar.component';

@Component({
  selector: 'app-org-joyplot',
  templateUrl: './org-joyplot.component.html',
  styleUrls: ['./org-joyplot.component.css']
})
export class OrgJoyplotComponent implements OnInit {
  public joynums: JoyPlotNumbers[];
  public bars: BarChart[];

  constructor(private _organogramService: OrganogramService) { }

  ngOnInit() {
    this.bars = [];
    this._organogramService.getJoyplot()
      .subscribe(joynums => this.populateBarCharts(joynums));
  }

  private pushValue(bars: Bar[], value: string, jn: JoyPlotNumbers): number{
    bars.push({'label': value, 'num': jn[value]});
    return jn[value];
  }

  populateBarCharts(joynums: JoyPlotNumbers[]){
    this.joynums = joynums;
    this.bars = [];
    for(let jn of joynums){
      let barchart = <BarChart>{};
      barchart.axis_value = 0;
      barchart.bars = [];
      for(let key of Object.keys(jn)){
        if(typeof jn[key] == 'number'){
          let test = this.pushValue(barchart.bars, key, jn);
          if(test > barchart.axis_value){
            barchart.axis_value = test;
          }
        }
      }
      this.bars.push(barchart);
    }
  }

}
