import {Routes, RouterModule} from '@angular/router';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
// Until useAsDefault: true has returned
import {NotFoundComponent} from './notfound.component';

const appRoutes: Routes = [
    //{path: 'about', component: AboutComponent},
    {path: 'user', component: UserComponent},
    {path: 'questionnaire/:type', component: QuestionnaireComponent},
    // Until useAsDefault: true has returned
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
