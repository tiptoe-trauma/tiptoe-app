import {Input, Component, OnInit} from '@angular/core';
import {Question, Stat} from './question';
import {User} from './user';
import {QuestionService} from './question.service';
import { DomSanitizer } from '@angular/platform-browser';

//declare var jquery:any;

@Component({
    selector: 'my-stat',
    templateUrl: 'templates/stat.html',
    styleUrls: ['../css/guage.css'],
})

export class StatComponent implements OnInit {
    @Input() question: Question;
    @Input() user: User;
    public stat: Stat;

    constructor(private _questionService: QuestionService,
                private _sanitizer: DomSanitizer) { }

    ngOnInit(){
        this._questionService.getStats(this.question.id, this.user.token)
                            .subscribe(stat => this.stat = stat,
                                       error => console.error(error));
    }

    getStyle(){
        let n = 180 * this.stat.same;
        let style = "transform: rotate(" + n + "deg) translate3d(0, 0, 0);"
        return this._sanitizer.bypassSecurityTrustStyle(style);
    }
}