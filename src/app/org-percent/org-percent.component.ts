import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService } from '../services/organogram.service';
import { UserService } from '../services/user.service';

@Component ({
    selector: 'app-org-percent',
    templateUrl: './org-percent.component.html',
    styleUrls: ['./org-percent.component.css']
})

class AnswerResults {
    keyword: string;
    percent_yes: number;
    // cert_results: number;
    // other_results: number;

    constructor(keyword: string, percent_yes: number,)
               {this.keyword = keyword; this.percent_yes = percent_yes;};
}

export class OrgPercentComponent implements OnInit {
    public results = [];
    @Input() public category: string;
    @Input() public wanted_ids: number[];

    constructor(private _organogramService: OrganogramService,
                private _userService: UserService) { }

    ngOnInit() { }

    public getResponses(category: string){
        this.category = category;
        let token = this._userService.token;
        this._organogramService.getPercentStats(token, this.category)
            .subscribe(summary => this.fillResults(summary));
       }

    fillResults(summary: object){
        for(let key of Object.keys(summary)){
            if (this.wanted_ids.includes(parseInt(key))){
                let q_text = summary[key]["q_text"];
                let keyword = q_text.substring(q_text.indexOf('{')+1, q_text.indexOf('|'));
                let percent_yes = summary[key]["percent_yes"];
                let result = new AnswerResults(keyword, percent_yes);
                this.results.push(result)
            }
        }

    }
}