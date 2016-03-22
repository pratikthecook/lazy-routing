/**
 * Created by pratik on 7/3/16.
 */
import {Component} from 'angular2/core';
import{Injectable}   from 'angular2/core';
import { Http, HTTP_PROVIDERS,Response} from 'angular2/http';
import {Router,RouteConfig, ROUTER_DIRECTIVES,RouterLink , AsyncRoute , ROUTER_PROVIDERS , RouteDefinition ,Route} from 'angular2/router';



@Injectable()
export class RouteService{
    resultObject : any;
    routeConfig : RouteDefinition [];
    constructor(private _http : Http,private _router:Router){
        this.routeConfig = [];
    }


    fetchRouterConfig(callback){
    let URL: string = '/lazy-routing/routes.json';
        this._http.get(URL)
            .map(res =>res.json())
            .subscribe(
                data => callback(data),
                err => console.log("Error Occured"),
                () => console.log("Completed")
            );
    }


    /**
     * using Http async call fetch components from json and load them in router.config using configRoutes()
     * @param path
     */
    loadUserRoutesHttp(path : string,mainRef : any){
        let URL: string = '/lazy-routing/'+path;

        let appComponentRef = mainRef;
        console.log("Begin http call");

        this._http.get(URL)
            .map(res =>res.json())
            .subscribe(
                data => {
                    this.resultObject = data;
                    console.log(data);
                },
                err => {
                  console.log("catch ex");
                },
                () => {
                    // Config the routes
                    this.configRoutes(appComponentRef);
                }
            );

    }

    /**
     * Config routes the fetched routes from json.
     */
    configRoutes(appComponentRef : any){
        let routes : any[] = this.resultObject;
        routes.forEach((route : any) => {
            this.routeConfig.push(
                new AsyncRoute({
                    path : route.path,
                    loader : () => System.import(route.resource).then(m => m[route.component]),
                    name : route.name
                })
            );
            // TODO : Update the Parent view here
            appComponentRef.globalRouteNameDirectory.push({'name': route.name, 'route' : route.route});
            console.log('name'+ route.name+ ' route '+route.route)
        });
        console.log('configured');
        appComponentRef.routesReady = true;
    }


    /**
     * using jQuery Ajax sync call to load component name,path from JSON.
     * @param path
     * @returns {any}
     */
    fetchUserSelectedRoutes(path : string){
        var context = this;
        $.ajax({
            type: 'GET',
            url: '/lazy-routing/'+path,    //  /lazy-routing/routes.json  || /lazy-routing/singleroute.json
            data: this.resultObject,
            async:false,
            dataType: 'json',
            success: function(data, status, headers, config) {
                //console.log("ajax call");
                //console.log(data);
                context.resultObject = data;
            }
        });
        return this.resultObject;
    }

}