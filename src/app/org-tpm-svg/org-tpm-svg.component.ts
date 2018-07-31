import { Component, OnInit, Input } from '@angular/core';
import { TPMStats } from '../organogram.service';

@Component({
  selector: 'app-org-tpm-svg',
  templateUrl: './org-tpm-svg.component.html',
  styleUrls: ['./org-tpm-svg.component.css']
})
export class OrgTpmSvgComponent implements OnInit {
  @Input() tpm_stats: TPMStats;

  constructor() { }

  ngOnInit() {
  }

  public certification(name){
    return (this.tpm_stats.certifications && this.tpm_stats.certifications.indexOf(name) > -1);
  }

  public reports(name){
    return (this.tpm_stats.reporting && this.tpm_stats.reporting.indexOf(name) > -1);
  }


}
