import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import { ErrorService } from './errors';
import {User} from './user';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Router, ActivatedRoute } from '@angular/router';

declare function ga(a, b, c): void;


@Component({
    selector: 'cafe-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
})


export class AppComponent implements OnInit {
  public user: User;
  public register: boolean = false;
  public retreival: boolean = false;
  public email: string;
  public email2: string;
  public finished: boolean = false;

  constructor(private _userService: UserService,
              private _router: Router,
              private _errorService: ErrorService,
              private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics){ }

  setUser(user: User){
    if(user == undefined){
      this.angulartics2GoogleAnalytics.setUsername(undefined);
      this.finished = false;
      this.user = user;
    } else {
      this.angulartics2GoogleAnalytics.setUsername(user.username);
      ga('set', 'userId', user.username);
      this.finished = true;
      this.user = user;
      if(this.user.active_organization){
        this._router.navigate(['questionnaire', this.user.active_organization.org_type]);
      }
    }
  }

  newQuestionnaire() {
    this.register = true;
    this.retreival = false;
  }

  retreiveQuesionnaire(){
    this.register = false;
    this.retreival = true;
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

  startQuestionnaire(questionnaire_type: string){
    this._userService.createUser(questionnaire_type, this.email).subscribe(
      user => user.subscribe(
        user => this.setUser(user)),
      error => this._errorService.announceError('Start Error',
                                                 error['error'],
                                                 3)
    );
  }

  ngOnInit(){
    let url = new URL(window.location.href);
    if(url.href.search("/login") > 0 && url.searchParams.has('token')){
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
