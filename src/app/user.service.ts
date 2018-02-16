import {Injectable, EventEmitter} from '@angular/core';
import {User, Organization} from './user';
import {Question} from './question';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
    public token: string = null;
    public user: User = null;
    public userObserver: Observable<User>;
    private _answers: { [q_id: number]: string } = { };
    public userChanged: EventEmitter<User>;

    constructor(private _http: Http) {
        if(localStorage.getItem('user') !== null){
            this.token = localStorage.getItem('user');
        }
        this.userChanged = new EventEmitter();
    }

    haveUser(){
        return this.token !== null;
    }

    getUser(){
        //return this.requestUser(this.token);
        if(this.user){
            return Observable.of(new Object()).map(user => this.user);
        } else if(this.token){
            return this.requestUser(this.token);
        } else {
            return Observable.throw(new Error("No User"));
        }
    }

    logout(){
        // wow such javascript
        //localStorage['user'] = null;
        localStorage.removeItem('user');
        this.token = null;
        this.user = null;
        this.userChanged.emit(this.user);
        this._answers = { };
    }

    private _loginUrl: string = '/api/auth/';

    login(username: string, password: string){
        let body = JSON.stringify({'username':username, 'password':password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.post(this._loginUrl, body, options)
                      .map(res => this.requestUser(res.json().token)
                                      .subscribe(
                                        res => this.user = res,
                                        error => console.error(error)
                                      ))
                      .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error || 'Server Error');
    }

    private _userUrl: string = '/api/user/';

    requestUser(token: string){
        this.token = token;
        localStorage['user'] = token;
        let headers = new Headers({'Accept': 'application/json',
                                   'Authorization': 'Token ' + token });
        let options = new RequestOptions({headers: headers});

        return this._http.get(this._userUrl, options)
                          .map(res => this.setUser(<User> res.json(), token))
                          .catch(this.handleError);
    }

    setUser(user: User, token: string){
        user.token = token;
        this.user = user;
        this.userChanged.emit(this.user);
        return this.user
    }

    getValue(question: Question){
        return this._answers[question.id];
    }

    setValue(question: Question, value: string){
        this._answers[question.id] = value;
    }

    setActiveOrganization(org: Organization){
        if(this.haveUser()){
            let body = '{"id": ' + org.id + '}';
            let headers = new Headers({'Content-Type': 'application/json',
                                       'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.post(this._userUrl, body, options)
                          .map(res => this.setUser(<User> res.json(), this.token))
                          .catch(this.handleError);
        } else {
            return Observable.throw("Must be logged in to set active organization");
        }
    }

    private _organizationUrl: string = '/api/organization/';

    createOrganization(org: Organization){
        if(this.haveUser()){
            let body = JSON.stringify(org);
            let headers = new Headers({'Content-Type': 'application/json',
                                       'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.post(this._organizationUrl, body, options)
                          .map(res => <Organization> res.json())
                          .catch(this.handleError);
        } else {
            return Observable.throw("Must be logged in to create organizations");
        }
    }

    deleteOrganization(org: Organization){
        if(this.haveUser()){
            let headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.delete(this._organizationUrl + org.id + '/', options)
                              .map(res => {
                                  this.user.active_organization = null;
                                  this.setUser(this.user, this.token);
                              })
                              .catch(this.handleError);
        } else {
            return Observable.throw("Must be logged in to delete organizations");
        }
    }


    requestOrganizationList(){
        if(this.haveUser()){
            let headers = new Headers({'Accept': 'application/json',
                                       'Authorization': 'Token ' + this.token });
            let options = new RequestOptions({headers: headers});

            return this._http.get(this._organizationUrl, options)
                              .map(res => <Organization[]> res.json())
                              .catch(this.handleError);
        } else {
            return Observable.throw("Must be logged in to request organizations");
        }
    }
}
