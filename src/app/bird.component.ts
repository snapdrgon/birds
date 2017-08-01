import {Component,OnInit} from '@angular/core';
import { BirdObserver } from './birdobserver';
import { BirdService } from './bird.service';

@Component({
    selector:'birds-observed',
    templateUrl:'./bird.component.html',
    styleUrls:['./bird.component.css']
})

export class  BirdComponent implements OnInit {   

    birdsObserver:BirdObserver[] = [];

    constructor(private _service: BirdService) {
    }

    ngOnInit(){
        var  location = {latitude:0, longitude:0};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                location = {latitude: position.coords.latitude, longitude:position.coords.longitude };
                var observable = this._service.getBirds(location)
                .subscribe(b=>b.forEach(
                    bird=>{
                    this.birdsObserver.push(bird);   
                    }
                ));
            },  
            function() {
                location  = {latitude:39.94,longitude: -105.12 };  
                var observable = this._service.getBirds(location)
                .subscribe(b=>b.forEach(
                    bird=>{
                    this.birdsObserver.push(bird);   
                    }
                ));
            });
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }       
        console.log(this.birdsObserver);
    }

}
