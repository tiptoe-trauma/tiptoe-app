import {Component} from '@angular/core';
import {UserService} from './user.service';


@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['../css/app.css'],
    providers: [ UserService ]

})


export class AppComponent { }
