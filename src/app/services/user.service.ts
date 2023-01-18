
import {throwError as observableThrowError, of as observableOf, Observable} from 'rxjs';

import {map,  tap } from 'rxjs/operators';
import {Injectable, EventEmitter} from '@angular/core';
import {User, Organization} from '../user';
import {Question} from '../question';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Token {
   token: string;
}

@Injectable()
export class UserService {
    public token: string = null;
    public user: User = null;
    public userChanged: EventEmitter<User>;

    constructor(private http: HttpClient) {
        if(localStorage.getItem('user') !== null){
            this.token = localStorage.getItem('user');
        }
        this.userChanged = new EventEmitter();
    }

    haveUser(){
        return this.token !== null;
    }

    getUser(): Observable<User>{
        if(this.user){
            return observableOf(this.user);
        } else if(this.token){
            return this.requestUser(this.token);
        } else {
            return observableThrowError(new Error("No User"));
        }
    }

    logout(){
        // wow such javascript
        //localStorage['user'] = null;
        localStorage.removeItem('user');
        this.token = null;
        this.user = null;
        this.userChanged.emit(this.user);
    }

    private _createUrl: string = '/api/create_user/';

    createUser(questionnaire_type: string, email: string, name?: string): Observable<Observable<User>> {
      return this.http.post<Token>(this._createUrl + questionnaire_type, {email: email, name: name}).pipe(
                      map(res => this.requestUser(res.token)));
    }

    private _updateEmailUrl: string = '/api/update_email/';

    updateEmail(new_email: string): Observable<User> {
      let options = { headers: new HttpHeaders(
                                  {Authorization: 'Token ' + this.token })
                     };
      return this.http.post<User>(this._updateEmailUrl, {email: new_email}, options);
    }

    private _retrieveUrl: string = '/api/retrieve_user/';

    retrieveUser(email: string) {
      return this.http.post(this._retrieveUrl, {email: email});
    }

    private _tokenUrl: string = '/api/token_login/';

    tokenLogin(login_token: string): Observable<Observable<User>> {
      return this.http.post<Token>(this._tokenUrl, {login_token: login_token}).pipe(
                      map(res => this.requestUser(res.token)));
    }

    private _loginUrl: string = '/api/auth/';

    // TODO: Change this to use a hash
    login(username: string, password: string): Observable<Observable<User>> {
        let body = {username: username, password: password};
        return this.http.post<Token>(this._loginUrl, body).pipe(
                      map(res => this.requestUser(res.token)));
    }

    private _userUrl: string = '/api/user/';

    requestUser(token: string): Observable<User> {
        this.token = token;
        localStorage['user'] = token;
        let options = { headers: new HttpHeaders(
                                    {Authorization: 'Token ' + token })
                       };
        return this.http.get<User>(this._userUrl, options).pipe(
                                          tap(user => this.setUser(user, token))
                                        );
    }

    setUser(user: User, token: string): User{
        user.token = token;
        this.user = user;
        this.userChanged.emit(this.user);
        return this.user
    }

    setActiveOrganization(org: Organization): Observable<User>{
        if(this.haveUser()){
            let body = {id: org.id};
            let options = { headers: new HttpHeaders(
                                        {Authorization: 'Token ' + this.token })
                           };
            return this.http.post<User>(this._userUrl, body, options).pipe(
                                          tap(user => this.setUser(user, this.token))
                                        );
            //              .map(user => this.setUser(user, this.token));
        } else {
            return observableThrowError("Must be logged in to set active organization");
        }
    }

    private _organizationUrl: string = '/api/organization/';

    sendInvitation(email: string, org: Organization): Observable<void>{
        console.log('invite test 2')
        if(this.haveUser()){
            let options = { headers: new HttpHeaders(
                                        {Authorization: 'Token ' + this.token })
                           };
            console.log('invite test 3')
            return this.http.post<any>('/api/invite/', [email, org], options);
        } else {
            return observableThrowError("Must be logged in to send invitations");
        }
    }

    deleteOrganization(org: Organization): Observable<void>{
        if(this.haveUser()){
            let options = { headers: new HttpHeaders(
                                        {Authorization: 'Token ' + this.token })
                           };
            return this.http.delete(this._organizationUrl + org.id + '/', options).pipe(
                              map( res => {
                                  this.user.active_organization = null;
                                  this.setUser(this.user, this.token);
                              }));
        } else {
            return observableThrowError("Must be logged in to delete organizations");
        }
    }


    requestOrganizationList(): Observable<Organization[]>{
        if(this.haveUser()){
            let options = { headers: new HttpHeaders(
                                        {Authorization: 'Token ' + this.token })
                           };
            return this.http.get<Organization[]>(this._organizationUrl, options);
        } else {
            return observableThrowError("Must be logged in to request organizations");
        }
    }
}
