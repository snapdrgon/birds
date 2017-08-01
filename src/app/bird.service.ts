import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';
import {Injectable} from '@angular/core';
import {BirdObserver} from './birdobserver';
import {Loc} from './loc';

@Injectable()
export class BirdService {


    private url = "http://localhost:50296/api/bird/";

    constructor( private _http: Http){
    };

    getBirds(location:Loc):Observable<BirdObserver[]> {
        console.log(location);
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        var  birdObservable = this._http.put(this.url, JSON.stringify(location), { headers: headers} )
        .map(resp => resp.json());

        return birdObservable;
    }

}

//http://localhost:50296/api/bird