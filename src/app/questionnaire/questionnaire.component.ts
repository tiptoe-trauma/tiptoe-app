import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../services/question.service';
import { UserService } from '../services/user.service';
import {Category, Completion} from '../question';
import {Survey, User} from '../user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angulartics2 } from 'angulartics2';
import {ErrorService} from '../errors';
import { Location } from '@angular/common';


@Component({
    selector: 'my-questionnaire',
    templateUrl: './questionnaire.html',
    styleUrls: ['./questionnaire.css'],
})

export class QuestionnaireComponent implements OnInit {
    public categories: Category[];
    public selectedCategory: Category;
    public groups: string[];
    public completion: Completion[];
    public isDone: boolean = false;
    public showCategories: boolean = false;
    public showCategory: boolean = true;
    public surveyEndText: string;
    public srvy: Survey;

    constructor(private _questionService: QuestionService,
                private _userService: UserService,
                private _route: ActivatedRoute,
                private _angulartics2: Angulartics2,
                private _errorService: ErrorService,
                private _location: Location,
                private _router: Router){ }

    ngOnInit(){
        this.showCategories = true;
        this.isDone = false;
        if (this._location.path() === "/questionnaire/tiptoe") {
          this.surveyEndText = "";
        } else {
          this.surveyEndText = "Thank you for completing the CAFE questionnaire.  If you would like to change any answers, click on the categories above to revisit a section of the survey.";
        }
        this._route.paramMap.pipe(
            switchMap((params: ParamMap) =>
               this._questionService.getCategories(params.get('type'))))
                 .subscribe(
                   categories => this.setCategories(categories),
                   error => {
                     console.log(error);
                     this._errorService.announceError('Server Error',
                            `Unable to load questions.
                             Please try reloading the page,
                             if this problem persists use the
                             contact information at the bottom`, 2);
             });
        this.updatePercent();
        let index = this.categories.indexOf(this.selectedCategory);
    }

    ngOnChanges() {
      this.showCategories = true;
      if (this._location.path() === "/questionnaire/tiptoe") {
        this.surveyEndText = "Thank you for completing the TIPTOE questionnaire.  If you would like to change any answers, click on the categories above to revisit a section of the survey.";
      } else {
        this.surveyEndText = "Thank you for completing the CAFE questionnaire.  If you would like to change any answers, click on the categories above to revisit a section of the survey.";
      }
      let index = this.categories.indexOf(this.selectedCategory);
      if(index + 1 === this.categories.length){
        this.isDone = true;
      } else {
        this.isDone = false;
      }
    }

  approveOrg() {
    this._userService.approveOrg().subscribe(
        srvy => srvy,
        error => {
          this._errorService.announceError('Survey Error',
                                           error['error'],
                                           3);
        });
  }


    category_group(group: string){
        let cats: Category[] = [];
        for(let i = 0; i < this.categories.length; i++){
            if(this.categories[i].group === group){
                cats.push(this.categories[i]);
            }
        }
        return cats
    }

    updatePercent(){
        this._questionService.getCompletion(this._userService.token).subscribe(
          completion => this.completion = completion,
          errors => console.log(errors)
        );
    }

    percent(category: Category){
      if(this.completion){
        for(let i = 0; i < this.completion.length; i++){
          if(this.completion[i].category == category.id){
            let percent = this.completion[i].completed_questions / this.completion[i].total_questions;
            return (percent * 100) + "%";
          }
        }
      }
      return 0
    }

    setCategories(categories: Category[]){
        this.categories = categories;
        if(this.categories && this.categories.length > 0){
          this.selectedCategory = this.categories[0];
        }
        // parse out groups
        this.groups = [];
        for(let i = 0; i < categories.length; i++){
            if(this.groups.indexOf(categories[i].group) === -1){
                this.groups.push(categories[i].group);
            }
        }
    }

    nextCategory(){
        let index = this.categories.indexOf(this.selectedCategory);
        if(index + 1 === this.categories.length){
            if(this._route.snapshot.paramMap.get('type') === 'tiptoe') {
                this.selectedCategory = this.categories[0];
                this.showCategory = false;
            } else { 
                this.selectedCategory = this.categories[0];
                this.showCategory = false;
            }
        } else {
            this.selectedCategory = this.categories[index + 1]
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if(index + 1 === this.categories.length){
          this.isDone = true;
        } else {
          this.isDone = false;
        }
    }

    onSelect(category: Category) {
        this._angulartics2.eventTrack.next({
            action: 'click',
            properties: {
                category: 'categoryChange',
                value: category.id,
                label: category.name
            }
        });
        this.selectedCategory = category;
        let index = this.categories.indexOf(this.selectedCategory);
        if(index + 1 === this.categories.length){
          this.isDone = true;
        } else {
          this.isDone = false;
        }
        this.showCategory = true;
    }
}
