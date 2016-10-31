import {Input, Component, OnInit,
    AfterViewChecked, EventEmitter} from '@angular/core';
import {Question, Answer, Stat} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {UserService} from './user.service';
import { DomSanitizer } from '@angular/platform-browser';

//declare var jquery:any;

@Component({
    selector: 'my-question',
    templateUrl: 'templates/question.html',
    styleUrls: ['../css/question.css',
                '../css/guage.css'],
    outputs: ['changed'],
})

export class QuestionComponent implements OnInit, AfterViewChecked {
    @Input() question: Question;
    public answer: Answer;
    public changed: EventEmitter<any> = new EventEmitter();
    public user: User;
    public stat: boolean = false;

    constructor(private _questionService: QuestionService,
                private _definitionService: DefinitionService,
                private _sanitizer: DomSanitizer,
                private _userService: UserService) { }

    ngOnInit(){
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

    ngAfterViewChecked(){
        //jquery('[data-toggle="popover"]').popover();
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
                        .subscribe(res => this.getStats(),
                                   error => console.error(error));
            if(this.question.q_type === "bool"){
                this.changed.emit(this.answer);
            }
         } else {
             console.log("Must be logged in to submit");
         }
    }
}
