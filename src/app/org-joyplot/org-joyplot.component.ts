import { Component, OnInit } from '@angular/core';
import { OrganogramService, JoyPlotNumbers } from '../organogram.service';
import { Bar, BarChart } from '../compact-bar/compact-bar.component';

export interface Path {
  id: string;
  path: string;
  offset: string;
  color: string;
  box_size: number;
  boxes: {}[];
}

@Component({
  selector: 'app-org-joyplot',
  templateUrl: './org-joyplot.component.html',
  styleUrls: ['./org-joyplot.component.css']
})
export class OrgJoyplotComponent implements OnInit {
  public joynums: JoyPlotNumbers[];
  public bars: BarChart[];
  public max_value: number;
  public paths: Path[];
  public show_bars: boolean;
  public hovered: string;

  constructor(private _organogramService: OrganogramService) { }

  ngOnInit() {
    this.hovered = "";
    this.show_bars = false;
    this.bars = [];
    this.paths = [];
    this.max_value = 50;
    this._organogramService.getJoyplot()
      .subscribe(joynums => this.populateBarCharts(joynums));
  }

  private pushValue(bars: Bar[], value: string, jn: JoyPlotNumbers): number{
    bars.push({'label': value, 'num': jn[value]});
    return jn[value];
  }

  toggleBars(){
    this.show_bars = !this.show_bars;
  }

  displayName(name: string){
    this.hovered = name;
  }

  clearName(){
    this.hovered = "";
  }

  createPaths(joynums: JoyPlotNumbers[]){
    this.paths = [];
    let offset = 0;
    for(let jn of joynums){
      let path = <Path>{};
      path.box_size = 5;
      path.boxes = [];
      path.path = "M0 0";
      let x = 0;
      let lastvalue = 0;
      for(let key of Object.keys(jn)){
        if(typeof jn[key] == 'number'){
          let value = jn[key];
          if(value < this.max_value){
            path.boxes.push({'name': key, 'x': x});
            path.path += (" Q " + x + ' ' + lastvalue);
            x += path.box_size;
            let halfway = ((value - lastvalue)/2) + lastvalue;
            path.path += (", " + x + ' ' + halfway);
            x += path.box_size;
            lastvalue = value;
          }
        }
      }
      path.path += " L" + x + " 0 L0 0";
      path.offset = "matrix(1 0 0 -1 0 " + (50 - offset)+ ")";
      path.id = "path" + offset;
      offset += path.box_size;
      path.color = offset % 2 == 0 ? '#0064FF' : '#2B82FF';
      this.paths.push(path);
    }
    this.paths.reverse();
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
          if(test > this.max_value){
            barchart.bars.pop();
          } else if(test > barchart.axis_value){
            barchart.axis_value = test;
          }
        }
      }
      this.bars.push(barchart);
    }
    this.createPaths(joynums);
  }

}
