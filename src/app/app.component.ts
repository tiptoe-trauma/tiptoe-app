import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user';


@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['../css/app.css'],
})


export class AppComponent implements OnInit {
    private user: User;

     constructor(private _userService: UserService){ }

     ngOnInit(){
        this._userService.getUser().subscribe(
            user => this.user = user,
            error => console.log(error)
        );
        this._userService.userChanged.subscribe(
            user => this.user = user
        )
     }
}
