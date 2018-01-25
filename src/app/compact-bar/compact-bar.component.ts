import { Component, OnInit, Input } from '@angular/core';


export interface Bar {
  label: string;
  num: number;
  height?: number;
  color?: string;
}

export interface BarChart {
  bars: Bar[];
  axis_value: number;
}

@Component({
  selector: 'app-compact-bar',
  templateUrl: './compact-bar.component.html',
  styleUrls: ['./compact-bar.component.css']
})
export class CompactBarComponent implements OnInit {
  @Input() data: BarChart;
  colors: string[];
  axises: number[];

  constructor() {
    this.colors = ['#F6AE06', '#E7010E', '#FC8008', '#A30004', '#FB3C06', '#750102'];
  }

  ngOnInit() {
    this.axises = [10, 8, 6, 4, 2];
    for(let i = 0; i < this.data.bars.length; i++){
      let b = this.data.bars[i];
      b.height = 100 * (b.num / this.data.axis_value);
      b.color = this.colors[i % this.colors.length];
    }
  }

}
