import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService } from '../services/organogram.service';
import { UserService } from '../services/user.service';

class AnswerResults {
    keyword: string;
    percent_yes: number;
    special_text: string;
    // cert_results: number;
    // other_results: number;

    constructor(keyword: string, percent_yes: number,)
               {this.keyword = keyword; this.percent_yes = percent_yes;};
}

@Component ({
    selector: 'app-org-percents',
    templateUrl: './org-percents.component.html',
    styleUrls: ['./org-percents.component.css']
})

export class OrgPercentsComponent implements OnInit {
    public results: AnswerResults[];
    @Input() public category: string;
    @Input() public wanted_ids: number[];

    constructor(private _organogramService: OrganogramService,
                private _userService: UserService) { }

    ngOnInit() {
        this.results = [];
        this.getResponses(this.category);
     }

    public getResponses(category: string){
        this.category = category;
        let token = this._userService.token;
        let web_category = category.split(' ').join('_');
        this._organogramService.getPercentStats(token, web_category)
            .subscribe(percents => this.fillResults(percents));
    }

    fillResults(percents: object){
        this.results = [];
        this.wanted_ids = this.get_ids()
        for(let key of Object.keys(percents)){
            if (this.wanted_ids.includes(parseInt(key))){
                let q_text = percents[key]["q_text"];
                let keyword = q_text.substring(q_text.indexOf('{')+1, q_text.indexOf('|'));
                let percent_yes = percents[key]["percent_yes"];
                let result = new AnswerResults(keyword, percent_yes);
                result.special_text = this.get_special_text(parseInt(key))
                this.results.push(result)
            }
        }
    }

    get_ids(){
      if(this.category === "Basic"){
        return [129, 1, 25, 12, 33]
      } else if(this.category === "Trauma Program"){
        return [100]
      } else if(this.category === "Regional Trauma Infrastructure"){
        return [148]
      } else if(this.category === "Emergency Medicine"){
        return [121, 101, 110]
      } else if(this.category === "Trauma Registrar"){
        return [34]
      } else if(this.category === "General Surgery"){
        return [41]
      }
    }

    get_special_text(q_id: number){
      if(q_id==148){
        return "Percent part of a trauma system"
      }
      else{
        return null
      }
    }
}