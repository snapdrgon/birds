import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';
import {Injectable} from '@angular/core';
import {BirdObserver} from './birdobserver';
import {Location} from './location';

@Injectable()
export class BirdService {


    private url = "http://localhost:50296/api/bird/";

    constructor( private _http: Http){
    };

    getBirds(location:Location,serverFlag:boolean):Observable<BirdObserver[]> {
        this.url = serverFlag ? "http://localhost:50296/api/bird/" : 
            "https://ebird.org/ws1.1/data/obs/geo/recent?lng=" + location.longitude + "&lat=" + location.latitude + "&fmt=json";
       // console.log(location);
        if (serverFlag) { //coming in from Web API
            let headers = new Headers();
            headers.append('Content-Type','application/json');
            var  birdObservable = this._http.put(this.url, JSON.stringify(location), { headers: headers} )
            .map(resp => resp.json());
        }
        else { //coming in from Cornell Ornithology API directly
            var  birdObservable = this._http.get(this.url)
            .map(resp => resp.json());
         }

        return birdObservable;
    }

}

