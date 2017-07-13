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

    constructor(private _service: BirdService) {}

    ngOnInit(){
        var observable = this._service.getBirds()
        .subscribe(b=>b.forEach(
            bird=>{
               this.birdsObserver.push(bird);   
            }
        ));
        console.log(this.birdsObserver);
    }


}
