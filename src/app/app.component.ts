import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {QuestionnaireComponent} from './questionnaire.component';
import {AboutComponent} from './about.component';
import {UserComponent} from './user.component';
import {LoginComponent} from './login.component';
import {UserService} from './user.service';
// Until useAsDefault: true has returned
import {NotFoundComponent} from './notfound.component';


@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['css/app.css'],
    providers: [HTTP_PROVIDERS, UserService]

})


export class AppComponent { }
