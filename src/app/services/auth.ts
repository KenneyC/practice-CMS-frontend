import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../models/user';
import { RegisterDetails } from '../models/register';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser") as any as string));
        this.currentUser = this.currentUserSubject.asObservable();
        this.headers = new HttpHeaders();
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
        this.headers.append('Access-Control-Allow-Methods', 'GET');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('https://localhost:5001/login', {username, password}, {headers: this.headers})
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }))
    }

    register(registerDetails: RegisterDetails) {
        return this.http.post<any>('https://localhost:5001/register', registerDetails, {headers: this.headers}).pipe();
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null as any as User);
    }
}