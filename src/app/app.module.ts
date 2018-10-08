import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { AppComponent }       from './app.component';
import { HttpModule }    from '@angular/http';
import { routing,
         appRoutingProviders } from './app.routing';
import {QuestionnaireComponent} from './questionnaire.component';
import {AboutComponent} from './about.component';
import {UserComponent} from './user.component';
import {LoginComponent} from './login.component';
// Until useAsDefault: true has returned
import {NotFoundComponent} from './notfound.component';
import { CategoryComponent } from './category.component';
import { QuestionComponent } from './question.component';
import { OrganogramComponent } from './organogram.component';
import { StatComponent } from './stat.component';
import { DefinitionPipe } from './definition.pipe';
import { UserService } from './user.service';
import { QuestionService } from './question.service';
import { DefinitionService } from './definition.service';
import { OrganogramService } from './organogram.service';
import { ErrorService, ErrorComponent } from './errors';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { CompactBarComponent } from './compact-bar/compact-bar.component';
import { OrgJoyplotComponent } from './org-joyplot/org-joyplot.component';
import { OrgPoliciesComponent } from './org-policies/org-policies.component';
import { OrgTmdSvgComponent } from './org-tmd-svg/org-tmd-svg.component';
import { OrgTpmSvgComponent } from './org-tpm-svg/org-tpm-svg.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  declarations: [
    QuestionComponent,
    CategoryComponent,
    QuestionnaireComponent,
    AboutComponent,
    UserComponent,
    LoginComponent,
    NotFoundComponent,
    AppComponent,
    StatComponent,
    OrganogramComponent,
    DefinitionPipe,
    ErrorComponent,
    CompactBarComponent,
    OrgJoyplotComponent,
    OrgPoliciesComponent,
    OrgTmdSvgComponent,
    OrgTpmSvgComponent,
  ],
  providers: [
    appRoutingProviders,
    UserService,
    QuestionService,
    DefinitionService,
    ErrorService,
    OrganogramService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
