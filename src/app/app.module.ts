import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { AppComponent }       from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { routing,
         appRoutingProviders } from './app.routing';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {UserComponent} from './user/user.component';
// Until useAsDefault: true has returned
import {NotFoundComponent} from './notfound.component';
import { CategoryComponent } from './category/category.component';
import { QuestionComponent } from './question/question.component';
import { DefinitionPipe } from './definition.pipe';
import { UserService } from './services/user.service';
import { QuestionService } from './services/question.service';
import { DefinitionService } from './services/definition.service';
import { OrganogramService } from './services/organogram.service';
import { ErrorService, ErrorComponent } from './errors';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { CompactBarComponent } from './compact-bar/compact-bar.component';
import { OrgJoyplotComponent } from './org-joyplot/org-joyplot.component';
import { OrgPoliciesComponent } from './org-policies/org-policies.component';
import { OrgTmdSvgComponent } from './org-tmd-svg/org-tmd-svg.component';
import { OrgTpmSvgComponent } from './org-tpm-svg/org-tpm-svg.component';
import { OrgPercentsComponent } from './org-percents/org-percents.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  declarations: [
    QuestionComponent,
    CategoryComponent,
    QuestionnaireComponent,
    UserComponent,
    NotFoundComponent,
    AppComponent,
    DefinitionPipe,
    ErrorComponent,
    CompactBarComponent,
    OrgJoyplotComponent,
    OrgPoliciesComponent,
    OrgTmdSvgComponent,
    OrgTpmSvgComponent,
    OrgPercentsComponent,
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
