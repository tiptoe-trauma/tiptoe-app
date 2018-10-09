import { Component, OnInit, Input } from '@angular/core';
import { TMDStats } from '../services/organogram.service';

@Component({
  selector: 'app-org-tmd-svg',
  templateUrl: './org-tmd-svg.component.html',
  styleUrls: ['./org-tmd-svg.component.css']
})
export class OrgTmdSvgComponent implements OnInit {
  @Input() tmd_stats: TMDStats;

  constructor() { }

  ngOnInit() { }

  public reports_board(){
    if(this.tmd_stats.reporting){
      return this.tmd_stats.reporting.indexOf('Hospital Board') > -1;
    }
    return false;
  }

  public reports_ceo(){
    if(this.tmd_stats.reporting){
      return this.tmd_stats.reporting.indexOf('Chief Executive Officer') > -1;
    }
    return false;
  }

  public reports_cmo(){
    if(this.tmd_stats.reporting){
      return this.tmd_stats.reporting.indexOf('Chief Medical Officer') > -1;
    }
    return false;
  }

  public reports_hcs(){
    if(this.tmd_stats.reporting){
      return this.tmd_stats.reporting.indexOf('Head of Clinical Services') > -1;
    }
    return false;
  }


}
