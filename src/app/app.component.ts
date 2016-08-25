import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {UserService} from './user.service';


@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['../css/app.css'],
    providers: [HTTP_PROVIDERS, UserService]

})


export class AppComponent { }
