
import {map, share} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Stat, Question, Category, Answer, Definition, Completion} from '../question';
import {User} from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class QuestionService {
    public defObserver: Observable<Definition[]>;
    private _definitionUrl = '/api/definitions/';

    constructor(private http: HttpClient) {
        this.defObserver = http.get<Definition[]>(this._definitionUrl).pipe(share());
    }

    private _categoryUrl = '/api/categories/';

    getCategories(type: string){
        return this.http.get<Category[]>(this._categoryUrl).pipe(
                            map(res => res.filter(
                              category => category.questionnaire === type)));
    }

    private _questionsUrl = '/api/questions/';

    getQuestions(category: number, token: string){
        let headers = new HttpHeaders();
        if(token){
            headers = new HttpHeaders({Authorization: 'Token ' + token });
        }
        let options = {headers: headers};
        return this.http.get<Question[]>(this._questionsUrl + category + '/', options);
    }

    private _completionUrl = '/api/completion/';

    getCompletion(token: string){
        let headers = new HttpHeaders();
        if(token){
            headers = new HttpHeaders({Authorization: 'Token ' + token });
        }
        let options = {headers: headers};
        return this.http.get<Completion[]>(this._completionUrl, options);
    }

    private _questionUrl = '/api/question/';

    getQuestion(question: number, token: string){
        let headers = new HttpHeaders();
        if(token){
            headers = new HttpHeaders({Authorization: 'Token ' + token });
        }
        let options = {headers: headers};
        return this.http.get<Question>(this._questionUrl + question + '/', options);
    }

    private _statUrl = '/api/stats/';

    getStats(question: number, token: string){
        let headers = new HttpHeaders();
        if(token){
            headers = new HttpHeaders({Authorization: 'Token ' + token });
        }
        let options = {headers: headers};
        return this.http.get<Stat>(this._statUrl + question + '/', options);
    }

    private _answerUrl = '/api/answer/';

    setValue(answer: Answer, token: string){
        if(token){
            let headers = new HttpHeaders({Authorization: 'Token ' + token });
            let options = {headers: headers};
            return this.http.post<Answer>(this._answerUrl, answer, options);
        }
    }

    getDefinitions(){
        return this.defObserver;
    }
}
