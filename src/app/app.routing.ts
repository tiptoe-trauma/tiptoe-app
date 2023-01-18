import {Routes, RouterModule} from '@angular/router';
import {PartnersComponent} from './info/partners/partners.component';
import {PublicationsComponent} from './info/publications/publications.component';
import {ResourcesComponent} from './info/resources/resources.component';
import {TrainingMaterialComponent} from './info/training-material/training-material.component';
import {UseCasesComponent} from './info/use-cases/use-cases.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {TiptoeComponent} from './tiptoe/tiptoe.component';
// Until useAsDefault: true has returned
import {NotFoundComponent} from './notfound.component';
import { DataFeedbackComponent } from './data-feedback/data-feedback.component';

const appRoutes: Routes = [
    // {path: 'uses', component: UseCasesComponent},
    {path: 'sparql', component: DataFeedbackComponent},
    {path: 'tiptoe', component: TiptoeComponent},
    {path: 'questionnaire/:type', component: QuestionnaireComponent},
    // Until useAsDefault: true has returned
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
