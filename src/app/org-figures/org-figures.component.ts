import { Component, OnInit, Input } from '@angular/core';
import { OrganogramService } from '../services/organogram.service';
import { UserService } from '../services/user.service';
import { Bar, BarChart } from '../compact-bar/compact-bar.component';

class AnswerResult {
    keyword: string;
    special_text: string;
    questionnaire: string;
    order: number;
    percent_yes: number;
    numbers: number;
    percentile_mark: number;
    options: BarChart;
    active_answer: any;

    constructor(keyword: string, questionnaire: string, order: number)
               {this.keyword = keyword; this.questionnaire = questionnaire, this.order = order};
}

@Component ({
    selector: 'app-org-figures',
    templateUrl: './org-figures.component.html',
    styleUrls: ['./org-figures.component.css']
})

export class OrgFigureComponent implements OnInit {
    public results: AnswerResult[];
    @Input() public category: string;

    constructor(private _organogramService: OrganogramService,
                private _userService: UserService) { }

    ngOnInit() {
        this.getResponses(this.category);
    }

    public getResponses(category: string){
        this.category = category;
        let token = this._userService.token;
        let web_category = category.split(' ').join('_');
        this._organogramService.getAnswers(token, web_category)
            .subscribe(answers => this.fillResults(answers));
    }

    fillResults(answers: Object){
        this.results = [];
        for(let key of Object.keys(answers)){
            if(answers[key]["active_answer"] != null){
                let q_text = answers[key]["q_text"];
                let questionnaire = answers[key]["questionnaire"];
                let keyword = q_text.substring(q_text.indexOf('{')+1, q_text.indexOf('|'));
                let order = answers[key]["order"];

                let result = new AnswerResult(keyword, questionnaire, order);
                result.special_text = this.get_special_text(parseInt(key));
                result.active_answer = answers[key]["active_answer"];
                if(answers[key]["trues"]){
                    result.percent_yes = Math.round((answers[key]["trues"]/answers[key]["total"]) * 100);
                } else if(answers[key]["numbers"]){
                    result.numbers = this.sortNumbers(answers[key]);
                    result.percentile_mark = Math.round(result.numbers/10);
                    console.log(result.percentile_mark);
                    // result.numbers = answers[key]["numbers"];
                } else if(answers[key]["options"]){
                    result.options = this.sortOptions(answers[key]);
                }
                this.results.push(result);
                // console.log(result);
            }
        }
        this.results = this.results.sort((a,b) => (a.order > b.order) ? 1 : -1)
    }

    sortNumbers(response){
        let numbers = response["numbers"].sort((a,b) => a - b);
        let active = response["active_answer"];
        var index: number;
        for(let i = 0; i < numbers.length; i++){
            if(numbers[i] == active){
                index = i;
            }
        }
        let percentile = Math.round(((index+1)/numbers.length)*100);
        console.log(percentile);

        return percentile;
    }

    // sortNumbers(response){
    //     let numbers = response["numbers"].sort((a,b) => a - b);
    //     var max = numbers[numbers.length - 1]
    //     var first = 0;
    //     var second = 0;
    //     var third = 0;
    //     var fourth = 0;
    //     var fifth = 0;
    //     for(let num in numbers){
    //        var placement = parseInt(num)/max;
    //        if(placement<=.2){
    //            first++;
    //        }
    //        else if(placement<=.4){
    //            second++;
    //        }
    //        else if(placement<=.6){
    //            third++;
    //        }
    //        else if(placement<=.8){
    //            fourth++;
    //        }
    //        else if(placement<=1){
    //            fifth++;
    //        }
    //     }

    //     let barchart = <BarChart>{};
    //     barchart.axis_value = 100;
    //     barchart.bars = [];
    //     let q_text = response['q_text'];
    //     let keyword = q_text.substring(q_text.indexOf('{')+1, q_text.indexOf('|'));
    //     barchart.name = keyword; 
    //     // barchart.name = response['keyword'];
    //     var active = parseInt(response["active_answer"])/max;
    //     barchart.bars.push({'label': "1-10%",
    //                         'num': (first/response['total']) * 100,
    //                         'active': (active/max)<=.2});
    //     barchart.bars.push({'label': "21-40%",
    //                         'num': (second/response['total']) * 100,
    //                         'active': (.2 < (active/max) && (active/max) <=.4)});
    //     barchart.bars.push({'label': "41-60%",
    //                         'num': (third/response['total']) * 100,
    //                         'active': (.4 < (active/max) && (active/max) <=.6)});
    //     barchart.bars.push({'label': "61-80%",
    //                         'num': (fourth/response['total']) * 100,
    //                         'active': (.6 < (active/max) && (active/max) <=.8)});
    //     barchart.bars.push({'label': "81-100%",
    //                         'num': (fifth/response['total']) * 100,
    //                         'active': (.8 < (active/max) && (active/max) <= 1)});

    //     return barchart;
    // }

    sortOptions(response){
        let options = response["options"];
        let barchart = <BarChart>{};
        barchart.axis_value = 100;
        barchart.bars = [];
        let q_text = response['q_text'];
        let keyword = q_text.substring(q_text.indexOf('{')+1, q_text.indexOf('|'));
        barchart.name = keyword; 
        // barchart.name = response['keyword'];
        for(let key of Object.keys(options)){
            let ratio = (options[key]/response['total']) * 100;
            barchart.bars.push({'label': key, 'num': ratio});
        }

        return barchart;
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
        return "Percent of centers that are part of a trauma system"
      }
      else{
        return null
      }
    }
}