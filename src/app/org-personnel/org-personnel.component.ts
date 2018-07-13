import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { TMDStats, OrganogramService } from '../organogram.service';

@Component({
  selector: 'app-org-personnel',
  templateUrl: './org-personnel.component.html',
  styleUrls: ['./org-personnel.component.css']
})
export class OrgPersonnelComponent implements OnInit {

  public our_tmd_stats: TMDStats;
  public average_tmd_stats: TMDStats;

  constructor(private _userService: UserService,
              private _organogramService: OrganogramService) { }

  ngOnInit() {
    let token = this._userService.token;
    this._organogramService.getTMDStats(token).subscribe(
      res => {
          this.our_tmd_stats = res[0];
          this.average_tmd_stats = res[1];
     });
  }
}
