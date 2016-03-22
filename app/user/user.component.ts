/**
 * Created by pratik on 21/3/16.
 */
import {Component , Type} from 'angular2/core';

@Component({
    template : '<p>Routed to new page </p>'
})

export class UserComponent{
    constructor(){
        console.log("UserComponent");
    }
}