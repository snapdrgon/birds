import {Router, RouterModule} from '@angular/router';
import {BirdComponent} from './bird.component';
import {HomeComponent} from './home.component';

export const routing = RouterModule.forRoot([
    {path:'', component: HomeComponent},
    {path:'birds', component:BirdComponent},      
    {path:'**', component: HomeComponent},    
]);
