import {Component, OnInit, HostListener} from '@angular/core';
import {UserService} from './services/user.service';
import { ErrorService } from './errors';
import {User} from './user';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare function ga(a, b, c): void;


@Component({
    selector: 'cafe-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
})



export class AppComponent implements OnInit {
  public user: User;
  public register: boolean = false;
  public retrieval: boolean = false;
  public email: string;
  public org_name: string;
  public email2: string;
  public finished: boolean = false;
  public about: boolean = false;

  constructor(private _userService: UserService,
              private _router: Router,
              private _location: Location,
              private _errorService: ErrorService,
              private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics){ }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    location.reload()
  }

  setUser(user: User){
    this.about = false;
    if(user == undefined){
      this.angulartics2GoogleAnalytics.setUsername(undefined);
      this.finished = false;
      this.user = user;
    } else {
      this.angulartics2GoogleAnalytics.setUsername(user.username);
      ga('set', 'userId', user.username);
      this.user = user;
      // if(this.user.active_organization){
      //   this._router.navigate(['questionnaire', this.user.active_organization.org_type]);
      // }
    }
  }

  toAbout() {
    this.about = true;
  }

  toCafe() {
    this.finished= true;
  }

  toTiptoe() {
    this.finished= true;
  }

  toTos() {
    this.finished= true;
  }

  newQuestionnaire() {
    this.register = true;
    this.retrieval = false;
  }

  retrieveQuesionnaire(){
    this.register = false;
    this.retrieval = true;
  }

  retrieveUser(){
    this._userService.retrieveUser(this.email2).subscribe(
      _ => this._errorService.announceError('Email Sent',
                                            'Please check your inbox',
                                            0),
      error => this._errorService.announceError('Email Error',
                                                error['error'],
                                                3)
    );
  }

  loginNavigation(questionnaire_type: string) {
    this.finished = true;
    if (questionnaire_type == 'tiptoe') {
      this._router.navigate(['tiptoe']);
    } else if (questionnaire_type == 'tos') {
      this._router.navigate(['tos']);
    } else {
      this._router.navigate(['user']);
    }
  }

  startQuestionnaire(questionnaire_type: string){
    this._userService.createUser(questionnaire_type, this.email, this.org_name).subscribe(
      user => user.subscribe(
        user => this.setUser(user)),
      error => this._errorService.announceError('Start Error',
                                                 error['error'],
                                                 3),
      ( ) => this.loginNavigation(questionnaire_type)
    );
  }

  ngOnInit(){
    if(this._location.path() == "/" || this._location.path() == "") {
      this.finished = false;
    } else {
      this.finished = true;
    }
    let url = new URL(window.location.href);
    if(url.searchParams.has('token')){
      let login_token = url.searchParams.get('token');
      this._userService.tokenLogin(login_token).subscribe(
        res => res.subscribe(
          user => this.setUser(user)),
        error => {
          this.finished = false;
          this._errorService.announceError('Login Error',
                                           error['error'],
                                           3);
        });
    } else {
      this._userService.getUser().subscribe(
        user => this.setUser(user),
        error => this.finished = false
      );
    }
    this._userService.userChanged.subscribe(
      user => this.setUser(user)
    );
  }
}
