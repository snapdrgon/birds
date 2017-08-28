import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';
import {Injectable} from '@angular/core';
import {BirdObserver} from './birdobserver';
import {Location} from './location';
import { BirdDataService } from './birddata.service';

@Injectable()
export class BirdService {
    birdObservable:Observable<any>;
    birdObserver:BirdObserver = new BirdObserver();
    private url = "http://localhost:50296/api/bird/";

    constructor( private _http: Http, private _birdDataService:BirdDataService){
    };

    getBirds(location:Location,serverFlag:boolean):Observable<any[]> {
       
        this.url = serverFlag ? "http://localhost:50296/api/bird/" : 
            "https://ebird.org/ws1.1/data/obs/geo/recent?lng=" + location.longitude + "&lat=" + location.latitude + "&fmt=json";
        if (serverFlag) { //coming in from Web API
            let headers = new Headers();
            headers.append('Content-Type','application/json');
            this.birdObservable = this._http.put(this.url, JSON.stringify(location), { headers: headers} )
            .map(resp => resp.json());
        }
        else { //coming in from Cornell Ornithology API directly
            this.birdObservable = this._http.get(this.url)
            .map(resp => resp.json());
         }

         //now save to mongoDB
         this.birdObservable.forEach(birds=>{
             birds.forEach(bird=>{
                //console.log(bird);
                this._birdDataService.saveBird(bird)
                .subscribe();
             })
         })
 
        return this.birdObservable;
    }

}

