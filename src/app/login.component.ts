import {User} from './user';
import {Component} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import { ErrorService } from './errors';

@Component ({
  selector: 'my-login',
  templateUrl: 'templates/login.html',
})

export class LoginComponent {
  public name: string;
  public password: string;

  constructor(private _errorService: ErrorService,
              private _userService: UserService,
              private _router: Router){ }

  public login(){
    this._userService.login(this.name, this.password)
                        .subscribe(
                                res => setTimeout(() => this._router.navigate(['/user']), 250),
                                error => this._errorService.announceError(
                                    'Login Failed', error, 2));
    // setTimeout here to prevent bug https://github.com/angular/angular/issues/6154
    // setTimeout(() => this._router.navigate(['/user']));
  }
}
