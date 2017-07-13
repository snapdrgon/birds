import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';
import {Injectable} from '@angular/core';
import {BirdObserver} from './birdobserver';

@Injectable()
export class BirdService {

    private url = "http://localhost:50296/api/bird";

    constructor( private _http: Http){};

    getBirds():Observable<BirdObserver[]> {
        var  birdObservable = this._http.get(this.url)
        .map(resp => resp.json());

        return birdObservable;
    }

}

//http://localhost:50296/api/bird