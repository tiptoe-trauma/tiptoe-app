import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './user';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Router } from '@angular/router';

declare function ga(a, b, c): void;


@Component({
    selector: 'cafe-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
})


export class AppComponent implements OnInit {
  public user: User;
  private register: boolean = false;

  constructor(private _userService: UserService,
              private _router: Router,
              private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics){ }

  setUser(user: User){
    if(user == undefined){
      this.angulartics2GoogleAnalytics.setUsername(undefined);
      this.register = true;
      this.user = user;
    } else {
      this.angulartics2GoogleAnalytics.setUsername(user.username);
      ga('set', 'userId', user.username);
      this.register = false;
      this.user = user;
      this._router.navigate(['questionnaire', this.user.active_organization.org_type]);
    }
  }

  startQuestionnaire(questionnaire_type: string){
    this._userService.createUser(questionnaire_type).subscribe(
      user => user.subscribe(
        user => this.setUser(user)),
      error => console.log(error)
    );
  }

  ngOnInit(){
    this._userService.getUser().subscribe(
      user => this.setUser(user),
      error => this.register = true
    );
    this._userService.userChanged.subscribe(
      user => this.setUser(user)
    );
  }
}
