import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Md5} from "ts-md5/dist/md5";

//const API_KEY = "a19db914eaaf445ba4f1a413c2792ec5"; //Insta
const API_KEY = "ddbe951d65791b12effb4c993c12b299"; //Flickr
//const API_SECRET = "a3197c96c79b457e808545a21386b24d"; //Insta
const API_SECRET = "64c6a3234739728c"; //Flickr


@Injectable() 
export class ApiService {
    private headers: Headers;
//    private baseUrl: string = "https://api.instagram.com";
    private baseUrl: string = "https://flickr.com";
    private crypto: any = require('crypto');
    private token: string;
    
    constructor (private http: Http) {
        this.setHeaders();
    }
    
    connect(): any {
        let request_token_url = "https://www.flickr.com/services/oauth/request_token";
        let oauth_nonce = this.getOauth_nonce();
        let oauth_timestamp = Math.floor(new Date().getTime()/1000);
        let oauth_consumer_key = API_KEY;
        let oauth_signature_method = "HMAC-SHA1";
        let oauth_version = "1.0";
        let oauth_callback = "http://localhost:8080";
//        let oauth_signature = Md5.hashStr(JSON.stringify(API_SECRET));
        
        let sigBaseString = "GET&" + encodeURIComponent("https://www.flickr.com/services/oauth/request_token") + "&";
        sigBaseString += encodeURIComponent("oauth_callback=http://localhost:8080&");
        sigBaseString += encodeURIComponent(`oauth_consumer_key=${oauth_consumer_key}&`);
        sigBaseString += encodeURIComponent(`oauth_nonce=${oauth_nonce}&`);
        sigBaseString += encodeURIComponent("oauth_signature_method=HMAC-SHA1&");
        sigBaseString += encodeURIComponent(`oauth_timestamp=${oauth_timestamp}`);
        sigBaseString += encodeURIComponent("oauth_version=1.0");
        
        let secret = API_SECRET;
        let algorithm = "sha1";   
        let hmac = this.crypto.createHmac(algorithm, secret);    
        hmac.write(sigBaseString);
        hmac.end();  
        let hash = hmac.read().toString('hex'); 
        console.log("sign string: ", hash);
        
        
        let url = `https://www.flickr.com/services/oauth/request_token
            ?oauth_nonce=${oauth_nonce}
            &oauth_timestamp=${oauth_timestamp}
            &oauth_consumer_key=${oauth_consumer_key}
            &oauth_signature_method=HMAC-SHA1
            &oauth_version=1.0
            &oauth_signature=${hash}
            &oauth_callback=${encodeURIComponent("oauth_callback=http://localhost:8080")}`;
        return this.get(url);
    }
    
    private getOauth_nonce(): any {
        let nonceLen = 32;
        return this.crypto.randomBytes(Math.ceil(nonceLen * 3 / 4))
            .toString('base64')  
            .slice(0, nonceLen)       
            .replace(/\+/g, '0')  
            .replace(/\//g, '0'); 
    }
    
    private setHeaders() {
        this.headers = new Headers();
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.headers.append("Content-Type", "application/json");
    }
//
//    setToken(token: string) {
//        if (!this.supportsLocalStorage()) {
//            console.log("doesnt support localStorage");
//        } else {
//            localStorage.setItem("token", token); 
//        }
//    }
//    
//    getToken() {
//        return localStorage.getItem("token");
//    }
    
//    supportsLocalStorage() {
//        return typeof(Storage)!== "undefined";
//    }
    
    getPromise(url: string): any {
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
   
    get(url: string): any {
        return this.http
//            .get(`${this.baseUrl}/${url}`, {headers : this.headers})
            .get(url, {headers : this.headers})
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}