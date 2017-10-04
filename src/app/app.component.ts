import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user';
import { Angulartics2GoogleAnalytics } from 'angulartics2';



@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['../css/app.css'],
})


export class AppComponent implements OnInit {
    public user: User;

     constructor(private _userService: UserService,
                 private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics){ }

    setUser(user: User){
        if(user === undefined){
            this.angulartics2GoogleAnalytics.setUsername(undefined);
        } else {
            this.angulartics2GoogleAnalytics.setUsername(user.username);
        }
        this.user = user;
    }

     ngOnInit(){
        this._userService.getUser().subscribe(
            user => this.setUser(user),
            error => console.log(error)
        );
        this._userService.userChanged.subscribe(
            user => this.setUser(user)
        )
     }
}
