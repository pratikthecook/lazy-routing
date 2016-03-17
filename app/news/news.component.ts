/**
 * Created by pratik on 10/3/16.
 */
import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {Router,RouteConfig, ROUTER_DIRECTIVES,RouterLink , AsyncRoute} from 'angular2/router';

@Component({
    templateUrl : './app/news/news.html',
    directives: [CORE_DIRECTIVES]
})

export class NewsComponent{
    constructor(){}
}


