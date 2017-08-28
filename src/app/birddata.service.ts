
import { BirdObserver } from './birdobserver';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';
import {Injectable} from '@angular/core';
import {Location} from './location';

@Injectable()
export class BirdDataService {


    private url = "http://localhost:3000/birds/";

    constructor( private _http: Http){
    };

    getBirds():Observable<any[]> {
        
            var  birdDataObservable = this._http.get(this.url)
            .map(resp => resp.json());
        
        return birdDataObservable;
    }

    saveBird(bird:any):Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var birdObs = { 
            "name" : bird.comName,
            "scientificName" :  bird.sciName,
            "numberSpotted" :bird.howMany,
            "dateObserved": bird.obsDt,
            "location": bird.locName,
            "latitude" : bird.lat,
            "longitude" : bird.lng,
        }
         var  birdObservable = 
        this._http.post(this.url, JSON.stringify(birdObs),options )
        .map(resp => resp.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));   
        //console.log(birdObservable);
        return birdObservable;
    }

}

