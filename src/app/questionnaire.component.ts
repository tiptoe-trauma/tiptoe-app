import {Component, OnInit} from '@angular/core';
import {QuestionService} from './question.service';
import { UserService } from './user.service';
import {Category, Completion} from './question';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Angulartics2 } from 'angulartics2';
import {ErrorService} from './errors';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['../css/questionnaire.css'],
})

export class QuestionnaireComponent implements OnInit {
    public categories: Category[];
    public selectedCategory: Category;
    public groups: string[];
    public completion: Completion[];

    constructor(private _questionService: QuestionService,
                private _userService: UserService,
                private _route: ActivatedRoute,
                private _angulartics2: Angulartics2,
                private _errorService: ErrorService,
                private _router: Router){ }

    ngOnInit(){
        this._route.paramMap
            .switchMap((params: ParamMap) =>
               this._questionService.getCategories(params.get('type')))
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
            this._router.navigate(['/organogram']);
            this.selectedCategory = this.categories[0];
        } else {
            this.selectedCategory = this.categories[index + 1]
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    }
}
