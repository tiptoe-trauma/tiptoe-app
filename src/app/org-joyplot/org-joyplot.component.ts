import { Component, OnInit } from '@angular/core';
import { OrganogramService, JoyPlotNumbers } from '../organogram.service';
import { UserService } from '../user.service';
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
  public axises: number[];

  constructor(private _organogramService: OrganogramService,
              private _userService: UserService) { }

  ngOnInit() {
    this.hovered = "";
    this.show_bars = false;
    this.bars = [];
    this.paths = [];
    this.max_value = 50;
    let token = this._userService.token;
    this._organogramService.getJoyplot(token)
      .subscribe(joynums => this.populateBarCharts(joynums));
  }

  private pushValue(bars: Bar[], value: string, jn: JoyPlotNumbers): number{
    bars.push({'label': value, 'num': jn[value]});
    return jn[value];
  }

  toggleBars(){
    this.show_bars = !this.show_bars;
  }

  translateKey(key: string){
    if('trauma_backup' == key) {
      return key;
    } else if('trauma_backup_approved' == key) {
      return key;
    } else if('ortho_number' == key) {
      return key;
    } else if('ortho_liason' == key) {
      return key;
    } else if('ortho_number_meetings' == key) {
      return key;
    } else if('ortho_residency' == key) {
      return key;
    } else if('ortho_fellowship' == key) {
      return key;
    } else if('neuro_number' == key) {
      return key;
    } else if('neuro_liason' == key) {
      return key;
    } else if('neuro_number_meetings' == key) {
      return key;
    } else if('neuro_residency' == key) {
      return key;
    } else if('anesth_number' == key) {
      return key;
    } else if('anesth_liason' == key) {
      return key;
    } else if('general_atls_once' == key) {
      return "Trauma surgeons ATLS certified once";
    } else if('general_atls_current' == key) {
      return "Trauma surgeons current in ATLS";
    } else if('trauma_priv' == key) {
      return key;
    } else if('trauma_panel' == key) {
      return key;
    } else if('trauma_cme' == key) {
      return key;
    } else if('trauma_board_eligible' == key) {
      return key;
    } else if('trauma_board_certified' == key) {
      return key;
    } else if('trauma_exclusive' == key) {
      return key;
    } else if('trauma_critical_certifications' == key) {
      return key;
    } else if('trauma_fellowship' == key) {
      return key;
    } else if('ortho_panel' == key) {
      return key;
    } else if('ortho_cme' == key) {
      return key;
    } else if('ortho_board_eligible' == key) {
      return key;
    } else if('ortho_board_certified' == key) {
      return key;
    } else if('ortho_exclusive' == key) {
      return key;
    } else if('neuro_panel' == key) {
      return key;
    } else if('neuro_cme' == key) {
      return key;
    } else if('neuro_board_eligible' == key) {
      return key;
    } else if('neuro_board_certified' == key) {
      return key;
    } else if('neuro_exclusive' == key) {
      return key;
    } else if('anesth_panel' == key) {
      return key;
    } else if('anesth_board_certified' == key) {
      return key;
    } else if('anesth_residency' == key){
      return key;
    } else if('id' == key){
      return "";
    }
    return key;
  }

  displayName(name: string){
    this.hovered = this.translateKey(name);
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
            let color = offset % 2 == 1 ? '#90D1E2' : '#81CC8E';
            if((x / (path.box_size * 2)) % 2 == 0){
              color = offset % 2 == 1 ? '#90C1E2' : '#81BC8E';
            }
            path.boxes.push({'name': key, 'x': x, 'color': color});
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
      path.id = "path" + offset;
      offset += path.box_size;
      path.color = offset % 2 == 0 ? '#0064FF' : '#81CC8E';
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
    this.axises = [this.max_value,
                   Math.ceil(this.max_value * .8),
                   Math.ceil(this.max_value * .6),
                   Math.ceil(this.max_value * .3),
                   Math.ceil(this.max_value * .2)];
  }

}
