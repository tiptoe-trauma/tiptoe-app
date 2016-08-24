import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }       from './app.component';
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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
