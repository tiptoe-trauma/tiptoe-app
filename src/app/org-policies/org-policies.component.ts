import { Component, OnInit } from '@angular/core';
import { OrganogramService, JoyPlotNumbers } from '../organogram.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-org-policies',
  templateUrl: './org-policies.component.html',
  styleUrls: ['./org-policies.component.css']
})
export class OrgPoliciesComponent implements OnInit {
  public joynums: JoyPlotNumbers[];
  public ournums: JoyPlotNumbers;
  public current_policy: string;
  public active_org: number;
  public policies: string[];
  public us_groups: string[];
  public both_groups: string[];
  public them_groups: string[];

  constructor(private _organogramService: OrganogramService,
              private _userService: UserService) { }

  ngOnInit() {
    this.policies = ['24/7', 'Liason', 'Residency', '50% Meetings'];
    this.us_groups = [];
    this.both_groups = [];
    this.them_groups = [];
    let token = this._userService.token;
    this._organogramService.getJoyplot(token)
      .subscribe(joynums => {
          this.ournums = joynums[0];
          this.joynums = joynums.slice(1);
          this.setPolicy(this.policies[0]);
        });
    }


  setPolicy(policy: string){
    this.us_groups = [];
    this.both_groups = [];
    this.them_groups = [];
    this.current_policy = policy;


    if(policy == '24/7'){
      let our_trauma = this.ournums['247_coverage'];
      let our_ortho = this.ournums['ortho_247'];
      let our_neuro = this.ournums['neuro_247'];
      let their_trauma_count = 0;
      let their_neuro_count = 0;
      let their_ortho_count = 0;
      for(let org of this.joynums){
        if(org['247_coverage']){
          their_trauma_count++;
        }
        if(org['ortho_247']){
          their_ortho_count++;
        }
        if(org['neuro_247']){
          their_neuro_count++;
        }
      }
      let their_trauma = (their_trauma_count / this.joynums.length) >= .5;
      let their_neuro = (their_neuro_count / this.joynums.length) >= .5;
      let their_ortho = (their_ortho_count / this.joynums.length) >= .5;
      if(our_trauma && their_trauma){
        this.both_groups.push('Trauma');
      } else if(our_trauma) {
        this.us_groups.push('Trauma');
      } else if(their_trauma) {
        this.them_groups.push('Trauma');
      }
      if(our_neuro && their_neuro){
        this.both_groups.push('Neuro');
      } else if(our_neuro) {
        this.us_groups.push('Neuro');
      } else if(their_neuro) {
        this.them_groups.push('Neuro');
      }
      if(our_ortho && their_ortho){
        this.both_groups.push('Ortho');
      } else if(our_ortho) {
        this.us_groups.push('Ortho');
      } else if(their_ortho) {
        this.them_groups.push('Ortho');
      }
    }


    if(policy == 'Liason'){
      let our_anesth = this.ournums['anesth_liason'];
      let our_ortho = this.ournums['ortho_liason'];
      let our_neuro = this.ournums['neuro_liason'];
      let their_anesth_count = 0;
      let their_neuro_count = 0;
      let their_ortho_count = 0;
      for(let org of this.joynums){
        if(org['anesth_liason']){
          their_anesth_count++;
        }
        if(org['ortho_liason']){
          their_ortho_count++;
        }
        if(org['neuro_liason']){
          their_neuro_count++;
        }
      }
      let their_anesth = (their_anesth_count / this.joynums.length) >= .5;
      let their_neuro = (their_neuro_count / this.joynums.length) >= .5;
      let their_ortho = (their_ortho_count / this.joynums.length) >= .5;
      if(our_anesth && their_anesth){
        this.both_groups.push('Anesth');
      } else if(our_anesth) {
        this.us_groups.push('Anesth');
      } else if(their_anesth) {
        this.them_groups.push('Anesth');
      }
      if(our_neuro && their_neuro){
        this.both_groups.push('Neuro');
      } else if(our_neuro) {
        this.us_groups.push('Neuro');
      } else if(their_neuro) {
        this.them_groups.push('Neuro');
      }
      if(our_ortho && their_ortho){
        this.both_groups.push('Ortho');
      } else if(our_ortho) {
        this.us_groups.push('Ortho');
      } else if(their_ortho) {
        this.them_groups.push('Ortho');
      }
    }


    if(policy == '50% Meetings'){
      let our_ortho = this.ournums['ortho_50_meetings'];
      let our_neuro = this.ournums['neuro_50_meetings'];
      let their_neuro_count = 0;
      let their_ortho_count = 0;
      for(let org of this.joynums){
        if(org['ortho_50_meetings']){
          their_ortho_count++;
        }
        if(org['neuro_50_meetings']){
          their_neuro_count++;
        }
      }
      let their_neuro = (their_neuro_count / this.joynums.length) >= .5;
      let their_ortho = (their_ortho_count / this.joynums.length) >= .5;
      if(our_neuro && their_neuro){
        this.both_groups.push('Neuro');
      } else if(our_neuro) {
        this.us_groups.push('Neuro');
      } else if(their_neuro) {
        this.them_groups.push('Neuro');
      }
      if(our_ortho && their_ortho){
        this.both_groups.push('Ortho');
      } else if(our_ortho) {
        this.us_groups.push('Ortho');
      } else if(their_ortho) {
        this.them_groups.push('Ortho');
      }
    }


    if(policy == 'Residency'){
      let our_ortho = this.ournums['ortho_residency'];
      let our_neuro = this.ournums['neuro_residency'];
      let their_neuro_count = 0;
      let their_ortho_count = 0;
      for(let org of this.joynums){
        if(org['ortho_residency']){
          their_ortho_count++;
        }
        if(org['neuro_residency']){
          their_neuro_count++;
        }
      }
      let their_neuro = (their_neuro_count / this.joynums.length) >= .5;
      let their_ortho = (their_ortho_count / this.joynums.length) >= .5;
      if(our_neuro && their_neuro){
        this.both_groups.push('Neuro');
      } else if(our_neuro) {
        this.us_groups.push('Neuro');
      } else if(their_neuro) {
        this.them_groups.push('Neuro');
      }
      if(our_ortho && their_ortho){
        this.both_groups.push('Ortho');
      } else if(our_ortho) {
        this.us_groups.push('Ortho');
      } else if(their_ortho) {
        this.them_groups.push('Ortho');
      }
    }
  }

}
