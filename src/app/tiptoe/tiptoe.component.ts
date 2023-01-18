import {User, Organization} from '../user';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ErrorService} from '../errors';

@Component ({
  selector: 'my-tiptoe',
  templateUrl: './tiptoe.html',
  styleUrls: ['./tiptoe.css'],
})

export class TiptoeComponent implements OnInit {
  public user: User;
  public organizations: Organization[];
  public new_org_name: string;
  public new_org_type: string;
  public new_email: string;
  public invite_to_org: Organization;

  constructor(private _userService: UserService,
              private _errorService: ErrorService,
              private _router: Router){
  }

    ngOnInit(){
        if (!this._userService.haveUser()){
            console.log('no user, navigating to home');
            this._router.navigate(['/']);
        } else {
            this._userService.getUser().subscribe(
                user => this.user = user
            );
            this.organizations = [];
            this._userService.requestOrganizationList().subscribe(
                orgs => this.organizations = orgs
            );
            this._userService.userChanged.subscribe(
                user => this.user = user
            )
            this.new_org_type = 'tiptoe'
            this.invite_to_org = null 
        }
    }

    updateEmail(){
      this._userService.updateEmail(this.user.email).subscribe(
        user => this.user = user,
        error => this._errorService.announceError('Email update error',
                                                  error['error'], 3)
      );
    }

    compareFn( optionOne, optionTwo ) : boolean {
      return optionOne === optionTwo;
    }

    sendInvitation(){
        if(!this.invite_to_org || this.invite_to_org == null){
            this._errorService.announceError('Invitation error.', 'Must enter organization name.', 2);
            return;
        }
        if(!this.new_email === undefined || this.new_email == null){
            this._errorService.announceError('Invitation Error', 'Must enter email address.', 2);
            return;
        }
        console.log('invite test')
        this._userService.sendInvitation(this.new_email, this.invite_to_org).subscribe(
          res => console.log("Invite sent."),
          error => console.log("organization setting error")
        );
    }

    deleteOrganization(org: Organization){
        if(confirm("Are you sure you want to delete: " + org.name) === true){
            this._userService.deleteOrganization(org).subscribe(
                res => {
                    this.organizations = this.organizations.filter(o => o != org);
                }
            );
        }
    }

    navigateToActiveQuestionnaire(){
        if(this.user.active_organization.org_type == 'center'){
            this._router.navigate(['/questionnaire/center']);
        } else if(this.user.active_organization.org_type == 'system'){
            this._router.navigate(['/questionnaire/system']);
        } else if(this.user.active_organization.org_type == 'tiptoe'){
            this._router.navigate(['/questionnaire/tiptoe']);
        } else if(this.user.active_organization.org_type == 'tos'){
            this._router.navigate(['/questionnaire/tos']);
        } else {
            console.log("incorrect questionnaire type");
        }
    }

    setActiveOrganization(org: Organization){
        this._userService.setActiveOrganization(org).subscribe(
            user => {
                this.user = user;
                this.navigateToActiveQuestionnaire();
            },
            error => console.log("organization setting error")
        );
    }

    logout(){
      let conf = false;
      if(this.user.email){
        conf = confirm("Are you sure you want to logout?");
      } else {
        conf = confirm("Are you sure you want to logout, you have not saved an email address and there will be no way to return to this questionnaire.");
      }
      if(conf){
        this._userService.logout();
        this.user = null;
        this._router.navigate(['/']);
      }
    }
}
