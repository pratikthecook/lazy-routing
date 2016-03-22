/**
 * Created by pratik on 7/3/16.
 */
import {Component} from 'angular2/core';
import {Router,RouteConfig, ROUTER_DIRECTIVES,RouterLink , AsyncRoute , ROUTER_PROVIDERS , RouteDefinition ,Route, Redirect} from 'angular2/router';
import {HomeComponent}   from './home.component';
import {RouteService}    from './services/RouteService';
import {Http, HTTP_PROVIDERS,Response} from 'angular2/http';



@Component({
    selector : 'lazy-app',
    templateUrl : './app/main.html',
    directives : [ROUTER_DIRECTIVES],   // Pointless when LazyLoading
    providers: [RouteService,HTTP_PROVIDERS]
})

@RouteConfig([
    {path: '/',name : 'Home' , component : HomeComponent , useAsDefault: true }
])


export class AppComponent {

        public globalRouteNameDirectory : Array;
        public routesReady : boolean;

        constructor(private _router:Router, private routeServ:RouteService) {
            console.log('app.component');

            this.globalRouteNameDirectory = [];
            this.routesReady = false;
        }


    /**
     * Method that loads routes based on user combobox selection
     * @param selectedRoutes
     */
    updatePageRoutes(selectedRoutes : string){
            this.routesReady = false;
            if(selectedRoutes==1){
                 // TODO : Pass AppComponent Reference here to update the globalRouteNameDirectory & rotesReady
                 this.routeServ.loadUserRoutesHttp('setone.json',this);

            }

            else{
                this.routeServ.loadUserRoutesHttp('settwo.json');
             }
        }


    /**
     * Returns a instance of class from classname in a string format when transpiled into js code. (Temporary Workaround)
     * @input: classname : string
     * @output: instance of that class.
     */
    getComponent(comp : string){
        //convert camelCase to underscore notation
        let component : string = comp;
        component = component[0].toLowerCase() + component.slice(1);
        component = component.replace(/([A-Z])/g, function(match) {
            return '_' + match.toLowerCase();
        });
        component += '_1.';
        return eval("new "+component+comp+"()");
    }



}


