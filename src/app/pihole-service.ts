import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Credentials } from './models/credentials';

@Injectable({
    providedIn: 'root',
})
export class PiholeService {
    
    constructor(
        private http: HttpClient
    ) { }
    
    getActivity()
    {
        if(this.storedCredentials().loginaddr != null && this.storedCredentials().pwhash != null)
        {
            var URL = this.storedCredentials().loginaddr;
            var auth = this.storedCredentials().pwhash;
            // Limit to 100 latest queries
            return this.http.get(URL+'/admin/api.php?getAllQueries=100&auth='+auth);
        } 
    }

    // Data that requires no authentication
    getData() {
        var baseUrl = localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')).loginaddr : null;
            baseUrl = baseUrl + '/admin/api.php';
            console.log('base: ' + baseUrl);
            return this.http.get(baseUrl);
    }

    storedCredentials() {
        var data = JSON.parse(localStorage.getItem('credentials'));
        if(data == null)
        {
            return {
                loginaddr: null,
                pwhash: null
            }
        } else {
            return data;
        }
    }

    storeCredentials(credentials: Credentials) {
        localStorage.setItem('credentials',
            JSON.stringify(credentials)
        );

        // OK!
        return "Credentials stored";
    }

    getStatus(){
        var URL = this.storedCredentials().loginaddr;
        var auth = this.storedCredentials().pwhash;
        // Limit to 100 latest queries
        return this.http.get(URL+'/admin/api.php?status&auth='+auth);
    }

    updateStatus(status: boolean){
        var URL = this.storedCredentials().loginaddr;
        var auth = this.storedCredentials().pwhash;
        if(status){
            var statusString = "enable";
        } else {
            var statusString = "disable";
        }
        // change status
        return this.http.get(URL+'/admin/api.php?'+statusString+'&auth='+auth);
    }

}
    