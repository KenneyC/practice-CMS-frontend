import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
    providedIn: 'root'
})

export class BlogServices {
    private headers: HttpHeaders; 

    constructor (private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
        this.headers.append('Access-Control-Allow-Methods', 'GET');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    create(blog: Blog) {
        return this.http.post<any>('https://localhost:5001/create', {...blog}, { headers: this.headers}).pipe();
    }
}