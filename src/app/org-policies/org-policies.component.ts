import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService } from '../services/organogram.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-org-policies',
  templateUrl: './org-policies.component.html',
  styleUrls: ['./org-policies.component.css']
})
export class OrgPoliciesComponent implements OnInit {
  public compliant_groups: string[];
  public not_compliant_groups: string[];
  @Input() public speciality: string;

  constructor(private _organogramService: OrganogramService,
              private _userService: UserService) { }

  ngOnInit() {
    this.compliant_groups = [];
    this.not_compliant_groups = [];
    this.getNumbers(this.speciality);
    }

  public getNumbers(speciality: string){
    this.speciality = speciality;
    let token = this._userService.token;
    this._organogramService.getSpecialityPolicies(token, speciality)
      .subscribe(policies => this.setPolicies(policies));
  }

  format_policy(policy_name: string){
    policy_name = policy_name.replace(this.speciality + '_', '');
    policy_name = policy_name.replace('247', '24/7');
    return policy_name.replace(/_/g, ' ');
  }

  setPolicies(policies: object){
    this.compliant_groups = [];
    this.not_compliant_groups = [];
    for(let key of Object.keys(policies)){
      if(policies[key] === true){
        this.compliant_groups.push(this.format_policy(key));
      } else if(policies[key] === false){
        this.not_compliant_groups.push(this.format_policy(key));
      }
    }
  }
}
