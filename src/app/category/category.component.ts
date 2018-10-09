import {Component, OnChanges, Input, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Question, Category} from '../question';
import {QuestionService} from '../services/question.service';
import {UserService} from '../services/user.service';
import {ErrorService} from '../errors';
import { OrganogramService } from '../services/organogram.service';
import { OrgPoliciesComponent } from '../org-policies/org-policies.component';
import { OrgJoyplotComponent } from '../org-joyplot/org-joyplot.component';

@Component({
    selector: 'my-category',
    templateUrl: './category.html',
    styleUrls: ['./category.css'],
    outputs: ['changed']
})

export class CategoryComponent implements OnChanges, OnInit {
    @Input() category: Category;
    @ViewChild('policies') policy_component: OrgPoliciesComponent;
    @ViewChild('joyplot') joyplot_component: OrgJoyplotComponent;
    public questions: Question[];
    public changed: EventEmitter<any> = new EventEmitter();
    public our_tmd_stats: object;

    public our_tpm_stats: object;

    public policies: boolean = false;

    constructor(private _questionService: QuestionService,
                private _errorService: ErrorService,
                private _organogramService: OrganogramService,
                private _userService: UserService){ }

    ngOnInit() {
      this.updateComparisons();
    }

    ngOnChanges() {
      this.our_tmd_stats = null;
      this.our_tpm_stats = null;
      this.policies = false;
      this.updateComparisons();
      this._questionService.getQuestions(this.category.id, this._userService.token)
          .subscribe(questions => this.questions = questions,
                     error => {
                       this.questions = [];
                       this._errorService.announceError('Server Error', 'Unable to load questions. Please try reloading the page, if this problem persists use the contact information at the bottom', 2);
                     });
    }

    translate_speciality(long_form: string){
      if(long_form === 'Trauma Surgery'){
        return 'trauma';
      } else if(long_form === 'Orthopedic Surgery'){
        return 'ortho';
      } else if(long_form === 'Neurosurgery'){
        return 'neuro';
      } else if(long_form === 'Anesthesiology'){
        return 'anesth';
      }
      return long_form;
    }

    updateComparisons(){
      let token = this._userService.token;
      if(this.category.name == "Trauma Medical Director"){
        this._organogramService.getTMDStats(token).subscribe(
          res => this.our_tmd_stats = res
        );
      }
      if(this.category.name == "Trauma Program Manager"){
        this._organogramService.getTPMStats(token).subscribe(
          res => this.our_tpm_stats = res
         );
       }
       if(['Trauma Surgery',
           'Orthopedic Surgery',
           'Neurosurgery',
           'Anesthesiology'].includes(this.category.name)){
         this.policies = true;
         if(this.policy_component){
           this.policy_component.getNumbers(this.translate_speciality(this.category.name));
         }
         if(this.joyplot_component){
           this.joyplot_component.updateNumbers(this.translate_speciality(this.category.name));
         }
       }
    }

    checkDeps(answer) {
        this.changed.emit(answer);
        this.updateComparisons();
        for(let i = 0; i < this.questions.length; i++){
            for(let j = 0; j < this.questions[i].depends_on.length; j++){
                if(this.questions[i].depends_on[j] == answer.question){
                    this._questionService.getQuestion(this.questions[i].id, this._userService.token)
                        .subscribe(question => {question.old = true,
                                                this.questions[i] = question},
                                   error => this._errorService.announceError('Server Error', 'There was an error with question dependency. Please try reloading the page, if this problem persists use the contact information at the bottom', 2));
                }
            }
        }
    }
}
