import { environment } from './../../environments/environment';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {BirdObserver} from '../_models/birdobserver';
import {Location} from '../_models/location';

@Injectable()
export class BirdService {
    birdApiKey = environment.ebirdApiKey;
    birdObservable: Observable<any>;
    private url;
    constructor( private _http: Http){
    };

    getBirds(location: Location): Observable<any[]> {

        this.url = 'https://ebird.org/ws2.0/data/obs/geo/recent?lat=' + location.latitude + '&lng=' + location.longitude;
        const headers = new Headers();
        headers.append('X-eBirdApiToken', this.birdApiKey);
        const options = new RequestOptions({headers: headers});
        // coming in from Cornell Ornithology API directly
        this.birdObservable = this._http.get(this.url, options)
        .map(resp => resp.json()); 
        return this.birdObservable;
    }

}

