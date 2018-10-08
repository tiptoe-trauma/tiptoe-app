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
  name: string;
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
  hover: string;

  constructor() {
    this.colors = ['#F6AE06', '#E7010E', '#FC8008', '#A30004', '#FB3C06', '#750102'];
  }

  ngOnInit() {
    this.hover = null;
    this.axises = [this.data.axis_value,
                   Math.ceil(this.data.axis_value * .8),
                   Math.ceil(this.data.axis_value * .6),
                   Math.ceil(this.data.axis_value * .3),
                   Math.ceil(this.data.axis_value * .2)];
    for(let i = 0; i < this.data.bars.length; i++){
      let b = this.data.bars[i];
      b.height = 100 * (b.num / this.data.axis_value);
      b.color = this.colors[i % this.colors.length];
    }
  }

  text_clean(text: string){
    text = text.replace(/^ortho_|neuro_|trauma_|anesth_/, '');
    text = text.replace(/_/g, ' ');
    text = text.replace(/247/g, '24/7');
    text = text.replace(/cme/, 'CME');
    return text;
  }

  mouse_over(text: string){
    this.hover = this.text_clean(text);
  }

  mouse_exit() {
    this.hover = null;
  }

}
