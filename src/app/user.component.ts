import {User, Organization} from './user';
import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'my-user',
  templateUrl: 'templates/user.html'
})

export class UserComponent implements OnInit {
  public user: User;
  public organizations: Organization[];
  public new_org_name: string;
  public new_org_type: string;

  constructor(private _userService: UserService,
        private _router: Router){
  }

    ngOnInit(){
        if (!this._userService.haveUser()){
            console.log('no user, navigating to login');
            this._router.navigate(['/login']);
        }
        this._userService.getUser().subscribe(
            user => this.user = user
        );
        this.organizations = [];
        this._userService.requestOrganizationList().subscribe(
            orgs => this.organizations = orgs
        );
    }

    createOrganization(){
        let new_org: Organization = {'name': this.new_org_name,
                                     'org_type': this.new_org_type,
                                     'users': [this.user.id]};
        this._userService.createOrganization(new_org).subscribe(
            org => {
                this.organizations.push(org);
                this.new_org_name = '';
                this.new_org_type = '';
            }
        );
    }

    deleteOrganization(org: Organization){
        if(confirm("Are you sure you want to delete: " + org.name) === true){
            this._userService.deleteOrganization(org).subscribe(
                res => {
                    this.organizations = this.organizations.filter(o => o != org);
                    if(org.id === this.user.active_organization.id){
                        this._userService.getUser().subscribe(
                            user => this.user = user
                        );
                    }
                }
            );
        }
    }

    setActiveOrganization(org: Organization){
        this._userService.setActiveOrganization(org).subscribe(
            user => this.user = user
        );
    }

    logout(){
        this._userService.logout();
        this.user = null;
        this._router.navigate(['/login']);
    }
}
