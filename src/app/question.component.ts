import {Input, Component, OnInit, EventEmitter,
    state, trigger, style, animate, transition, keyframes} from '@angular/core';
import {Question, Answer, Stat} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {UserService} from './user.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var $:any;

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    animations: [
        trigger('visibilityChanged', [
            state('true', style({ opacity: 1, display: 'inline'})),
            state('false', style({ opacity: 0, display: 'none'})),
            transition('void <=> true', animate('.5s', keyframes([
                style({opacity: 0, display: 'inline', offset: 0}),
                style({opacity: 1, display: 'inline', offset: 1}),
            ]))),
            transition('void <=> false', animate('.5s', keyframes([
                style({opacity: 1, display: 'inline', offset: 0}),
                style({opacity: 0, display: 'inline', offset: 1}),
            ]))),
            transition('new => *', animate('0s')),
        ])
    ],
    styleUrls: ['../css/question.css',
                '../css/guage.css'],
    outputs: ['changed'],
})

export class QuestionComponent implements OnInit {
    @Input() question: Question;
    public answer: Answer;
    public changed: EventEmitter<any> = new EventEmitter();
    public user: User;
    public stat: boolean = false;
    public visibility: string;

    constructor(private _questionService: QuestionService,
                private _definitionService: DefinitionService,
                private _sanitizer: DomSanitizer,
                private _userService: UserService) { }

    ngOnInit(){
        if(this.question.old){
            this.visibility = String(this.question.enabled);
        } else {
            this.visibility = 'new';
        }
        if(this.question.answer){
            this.answer = this.question.answer;
        } else {
            this.answer = {'question': this.question.id};
        }
        if(this._userService.haveUser()){
          this._userService.getUser().subscribe(
              user => this.setUser(user),
              error => console.error(error)
          );
        }
    }

    setUser(user: User){
        this.user = user;
        if(this.question.answer){
            this.getStats();
        }
    }

    setCheck(id: number){
      if(this.answer.options){
        this.answer.options.push(id);
      } else {
        this.answer.options = [id];
      }
      this.setValue();
    }

    isChecked(id: number){
      // indexOf returns -1 when item not found
      if(this.answer.options){
          return this.answer.options.indexOf(id) > -1;
      } else {
          return false;
      }
    }

    getStats(){
        this.stat = true;
    }

    setValue(){
        if(this.user){
            this.answer.question = this.question.id;
            this._questionService.setValue(this.answer, this.user.token)
                        .subscribe(res => {this.getStats();
                                           this.changed.emit(this.answer)},
                                   error => console.error(error));
         } else {
             console.log("Must be logged in to submit");
         }
    }
}
