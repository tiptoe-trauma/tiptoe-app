import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
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
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserService]

})

@Routes([
    {path: '/about', component: AboutComponent},
    {path: '/user', component: UserComponent},
    {path: '/login', component: LoginComponent},
    {path: '/questionnaire', component: QuestionnaireComponent},
    // Until useAsDefault: true has returned
    {path: '/', component: NotFoundComponent}
])

export class AppComponent { }
