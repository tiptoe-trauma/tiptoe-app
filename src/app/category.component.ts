import {Component, OnChanges, Input, EventEmitter} from '@angular/core';
import {Question, Category} from './question';
import {QuestionService} from './question.service';
import {UserService} from './user.service';
import {ErrorService} from './errors';

@Component({
    selector: 'my-category',
    templateUrl: 'templates/category.html',
    styleUrls: ['../css/category.css'],
    outputs: ['changed']
})

export class CategoryComponent implements OnChanges {
    @Input() category: Category;
    public questions: Question[];
    public changed: EventEmitter<any> = new EventEmitter();

    constructor(private _questionService: QuestionService,
                private _errorService: ErrorService,
                private _userService: UserService){ }

    ngOnChanges() {
        this._questionService.getQuestions(this.category.id, this._userService.token)
            .subscribe(questions => this.questions = questions,
                       error => {
                         this.questions = [];
                         this._errorService.announceError('Server Error', 'Unable to load questions. Please try reloading the page, if this problem persists use the contact information at the bottom', 2);
                       });
    }

    checkDeps(answer) {
        this.changed.emit(answer);
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
