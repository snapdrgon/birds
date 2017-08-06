import {Component,OnInit,Input} from '@angular/core';
import { BirdObserver } from './birdobserver';
import { BirdService } from './bird.service';

@Component({
    selector:'birds-observed',
    templateUrl:'./bird.component.html',
    styleUrls:['./bird.component.css']
})

export class  BirdComponent implements OnInit {   
    location = {latitude:0, longitude:0};
    birdsObserver:BirdObserver[] = [];
    firstPass:boolean = false;
    serverFlag:boolean = false;

    constructor(private _service: BirdService) {
    }

    ngOnInit(){
        this.populateMap();
    }

    placeMarker($event){
        //console.log($event.coords.lat);
        //console.log($event.coords.lng);
        this.location = {latitude:$event.coords.lat, longitude:$event.coords.lng};
        this.populateMap();
    }

    populateMap() {
        this.birdsObserver = []; //reset for next pass
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                if (!this.firstPass) { //use default coming in
                    this.location = {latitude: position.coords.latitude, longitude:position.coords.longitude };
                    this.firstPass = true;
                }
                var observable = this._service.getBirds(this.location, this.serverFlag)
                .subscribe(b=>b.forEach(
                    bird=>{
                    this.birdsObserver.push(bird);   
                    }
                ));
            },  
            function() {
                this.location  = {latitude:39.94,longitude: -105.12 };  
                var observable = this._service.getBirds(location, this.serverFlag)
                .subscribe(b=>b.forEach(
                    bird=>{
                    this.birdsObserver.push(bird);   
                    }
                ));
            });
        } else { 
            console.log("Geolocation is not supported by this browser. Using Broomfield, CO longitude and latitude.");
            this.location  = {latitude:39.94,longitude: -105.12 };  
            var observable = this._service.getBirds(this.location, this.serverFlag)
            .subscribe(b=>b.forEach(
                bird=>{
                this.birdsObserver.push(bird);   
                }
            ));
        }       
       // console.log(this.birdsObserver);

    }

}

