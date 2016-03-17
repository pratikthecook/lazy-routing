import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {Router,RouteConfig, ROUTER_DIRECTIVES,RouterLink , AsyncRoute} from 'angular2/router';

@Component({
    templateUrl : './app/blog/blog.html',
    directives: [CORE_DIRECTIVES]
})

export class BlogComponent{
    constructor(){}
}
