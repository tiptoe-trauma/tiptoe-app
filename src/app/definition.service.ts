import {Injectable} from '@angular/core';
import {Definition} from './question';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DefinitionService {
    public defObserver: Observable<Definition[]>;
    private _definitionUrl = '/api/definitions/';

    constructor(private _http: Http) {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({headers: headers});

        this.defObserver = _http.get(this._definitionUrl, options)
                            .map(res => <Definition[]> res.json())
                            .catch(this.handleError)
                            .share();
    }

    getDefinitions(){
        return this.defObserver;
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
