import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
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
import { ErrorService, ErrorComponent } from './errors';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
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
  ],
  providers: [
    appRoutingProviders,
    UserService,
    QuestionService,
    DefinitionService,
    ErrorService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
