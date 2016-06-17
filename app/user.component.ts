import {User} from './user';
import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'my-user',
  templateUrl: 'templates/user.html'
})

export class UserComponent implements OnInit {
  public user: User;

  constructor(private _userService: UserService,
        private _router: Router){
  }

    ngOnInit(){
        this.user = this._userService.getUser();
        if (this.user === null){
            console.log('no user, navigating to login');
            this._router.navigate(['/login']);
        }
    }

    logout(){
        this._userService.logout();
        this.user = this._userService.getUser();
        this._router.navigate(['/login']);
    }
}
