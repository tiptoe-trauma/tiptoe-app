import {Component, OnInit} from '@angular/core';
import {QuestionService} from './question.service';
import {DefinitionService} from './definition.service';
import {Category} from './question';

@Component({
    selector: 'my-questionnaire',
    templateUrl: 'templates/questionnaire.html',
    styleUrls: ['../css/questionnaire.css'],
    providers: [QuestionService, DefinitionService]
})

export class QuestionnaireComponent implements OnInit {
    public categories: Category[];
    public selectedCategory: Category;
    public errorMessage: any;
    public groups: string[];

    constructor(private _questionService: QuestionService){ }

    ngOnInit(){
        this._questionService.getCategories()
            .subscribe(categories => this.setCategories(categories),
                       error => this.errorMessage = <any>error);
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

    setCategories(categories){
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
        console.log(this.groups);
    }

    nextCategory(){
        let index = this.categories.indexOf(this.selectedCategory);
        if(index + 1 === this.categories.length){
            this.selectedCategory = this.categories[0];
        } else {
            this.selectedCategory = this.categories[index + 1]
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    onSelect(category: Category) {
        this.selectedCategory = category;
    }
}
