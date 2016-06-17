import {Injectable} from '@angular/core';
import {Question, Category, Answer, Definition} from './question';
import {User} from './user';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuestionService {
    public defObserver: Observable<Definition[]>;
    private _definitionUrl = '/api/definitions/';

    constructor(private _http: Http) {
        this.defObserver = _http.get(this._definitionUrl)
                            .map(res => <Definition[]> res.json())
                            .catch(this.handleError)
                            .share();
    }

    private _categoryUrl = '/api/categories/';

    getCategories(){
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._categoryUrl, options)
                            .map(res => <Category[]> res.json().results)
                            .catch(this.handleError);
    }

    private _questionUrl = '/api/questions/';

    getQuestions(category: number, user: User){
        let headers = new Headers({'Accept': 'application/json'});
        if(user){
            headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + user.token });
        }
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._questionUrl + category + '/', options)
                            .map(res => <Question[]> res.json())
                            .catch(this.handleError);
    }

    private _answerUrl = '/api/answer/';

    setValue(answer: Answer, user: User){
        if(user){
            let body = JSON.stringify(answer);
            let headers = new Headers({'Content-Type': 'application/json',
                                       'Accept': 'application/json',
                                       'Authorization': 'Token ' + user.token });
            let options = new RequestOptions({headers: headers});

            return this._http.post(this._answerUrl, body, options)
                          .map(res => <Answer> res.json().results)
                          .catch(this.handleError);
        }
    }


    getDefinitions(){
        return this.defObserver;
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
