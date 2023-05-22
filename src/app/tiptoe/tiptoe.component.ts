import {User, Survey, Organization} from '../user';
import {Component, OnInit, OnChanges, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ErrorService} from '../errors';


declare var $:any;
@Component ({
  selector: 'my-tiptoe',
  templateUrl: './tiptoe.html',
  styleUrls: ['./tiptoe.css'],
})


export class TiptoeComponent implements OnInit, OnChanges {
  public user: User;
  public surveys: Survey[];
  public organizations: Organization[];
  public surveyDate: string;
  public new_srvy_name: string;
  public new_org_type: string;
  public new_email: string;
  public invite_message: string;
  public invite_to_org: number;
  public approval: { [id: number]: boolean};
  public orgLoaded: boolean;
  public srvyLoaded: boolean;
  public orgForNewSrvy: Organization 

  constructor(@Inject(DOCUMENT) document: Document,
              private _userService: UserService,
              private _errorService: ErrorService,
              private _router: Router,
              private elRef: ElementRef){
  }

    ngOnInit(){
        this.orgLoaded = false
        this.srvyLoaded = false
        this.approval = {};
        if (!this._userService.haveUser()){
            console.log('no user, navigating to home');
            this._router.navigate(['/']);
        } else {
            this._userService.getUser().subscribe(
                user => this.user = user
            );
            this.organizations = [];
            this._userService.requestOrganizationList().subscribe(
                orgs => {this.organizations = orgs; 
                         this.orgLoaded = true;
                         this.updateApproval();
                        }
            );
            this.surveys = [];
            this._userService.requestSurveyList().subscribe(
                srvys => {this.surveys = srvys; 
                          this.srvyLoaded = true;
                          this.updateApproval();
                        }
            );
            this._userService.userChanged.subscribe(
                user => this.user = user
            )
            this.new_org_type = 'tiptoe'
            this.invite_to_org = null 
            this.invite_message = "You have been requested to complete the TIPTOE (Trauma Institutional Priorities and Teams for Outcome Efficacy) questionnaire for your trauma center.  Please use the link below to login and access the questionnaire."
        }

    }

    ngOnChanges(){
      this.updateApproval()
    }

    updateEmail(){
      this._userService.updateEmail(this.user.email).subscribe(
        user => this.user = user,
        error => this._errorService.announceError('Email update error',
                                                  error['error'], 3)
      );
    }

    updateApproval(){
      if(this.organizations.length > 0 && this.orgLoaded ==true && this.srvyLoaded == true) {
         for (var org of this.organizations) {
            if (org.org_type=='tiptoe'){
              var selectString = 'select' + org.id
              var inputElement = (<HTMLInputElement>document.getElementById(selectString))
              if (inputElement) {
                var surveyId = inputElement.value
                for (var survey of this.surveys) {
                  if (survey.id == Number(surveyId)) {
                    this.approval[org.id] = survey.approved
                  }
                }
              }
            }
         }
      }
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
        this._userService.sendInvitation(this.new_email, this.invite_to_org, this.invite_message).subscribe(
          res => {console.log("Invite sent.");
                  this._errorService.announceError('Email Sent',
                                            '',
                                            0);
                  },
          error => {console.log("organization setting error");
                    this._errorService.announceError('Email update error',
                                                  error['error'], 3);
                    }
        );
    }

    newSurvey() {
        this._userService.createSurvey(this.surveyDate, this.orgForNewSrvy).subscribe(
            res => {
              this.surveys.push(res);
              this._userService.setActiveSurvey(res).subscribe(
                  user => {
                      this.user = user;
                      this.navigateToActiveQuestionnaire();
                  },
                  error => console.log("survey setting error")
              );
            }
        );
    }

    deleteSurvey(srvy: Survey){
        if(confirm("Are you sure you want to delete: " + srvy.name) === true){
            this._userService.deleteSurvey(srvy).subscribe(
                res => {
                    this.surveys = this.surveys.filter(o => o != srvy);
                }
            );
        }
    }

    navigateToActiveQuestionnaire(){
        this._router.navigate(['/questionnaire/tiptoe']);
    }

    orgRowIsApproved(id: string){
        var selectString = 'select' + id
        var surveyId = (<HTMLInputElement>document.getElementById(selectString)).value

        for (var survey of this.surveys) {
          if (survey.id == Number (surveyId)) {
            return survey.approved
          }
        }
    }

    setActiveSurvey(id: string){
        var selectString = 'select' + id
        var inputElement = (<HTMLInputElement>document.getElementById(selectString))
        if (inputElement) {
          var surveyId = inputElement.value
          var selectedSurvey
          for (var survey of this.surveys) {
            if (survey.id == Number(surveyId)) {
              selectedSurvey = survey
            }

          }
          if (selectedSurvey) {
            this._userService.setActiveSurvey(selectedSurvey).subscribe(
                user => {
                    this.user = user;
                    this.navigateToActiveQuestionnaire();
                },
                error => console.log("survey setting error")
            );
          } else {
            var selectButton = 'newSurvey' + id 
            document.getElementById(selectButton).click();

          }
        }
        
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
