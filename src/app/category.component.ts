import {Component, OnChanges, Input} from '@angular/core';
import {Question, Category} from './question';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import { Angulartics2 } from 'angulartics2';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category.html',
    styleUrls: ['../css/category.css'],
})

export class CategoryComponent implements OnChanges {
    @Input() category: Category;
    public questions: Question[];
    public errorMessage: any;

    constructor(private _questionService: QuestionService,
                private _angulartics2: Angulartics2,
                private _userService: UserService){ }

    ngOnChanges() {
        this._angulartics2.eventTrack.next({
            action: 'categoryChange',
            properties: {
                category: this.category.name
            }
        })
        this._questionService.getQuestions(this.category.id, this._userService.token)
            .subscribe(questions => this.questions = questions,
                       error => this.errorMessage = <any>error);
    }

    checkDeps(answer) {
        for(let i = 0; i < this.questions.length; i++){
            for(let j = 0; j < this.questions[i].depends_on.length; j++){
                if(this.questions[i].depends_on[j] == answer.question){
                    this._questionService.getQuestion(this.questions[i].id, this._userService.token)
                        .subscribe(question => {question.old = true,
                                                this.questions[i] = question},
                                   error => this.errorMessage = <any>error);
                }
            }
        }
    }
}
