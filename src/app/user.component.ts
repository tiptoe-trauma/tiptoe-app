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
        if (!this._userService.haveUser()){
            console.log('no user, navigating to login');
            this._router.navigate(['/login']);
        }
        this._userService.getUser().subscribe(
            user => this.user = user
        );
    }

    logout(){
        this._userService.logout();
        this.user = null;
        this._router.navigate(['/login']);
    }
}
