/**
 * Created by pratik on 7/3/16.
 */
import {Component , Type} from 'angular2/core';
import {Router,RouteConfig, ROUTER_DIRECTIVES,RouterLink , AsyncRoute , ROUTER_PROVIDERS , RouteDefinition ,Route} from 'angular2/router';
import {HomeComponent}   from './home.component';
import {RouteService}    from './services/RouteService';
import {Http, HTTP_PROVIDERS,Response} from 'angular2/http';
import {ClassFinder}    from './classfinder';



@Component({
    selector : 'lazy-app',
    templateUrl : './app/main.html',
    directives : [ROUTER_DIRECTIVES],   // Pointless when LazyLoading
    //directives : [ROUTER_DIRECTIVES],
    providers: [RouteService,HTTP_PROVIDERS]
})

@RouteConfig([
    {path: '/',name : 'Home' , component : HomeComponent , useAsDefault: true }
])


//export var routeConfigArray : RouteDefinition [] = [];

    export class AppComponent {

        dynamicRouteViewArray : Array = [];
        routeConfigArray:RouteDefinition [] = [];
        routesReady : boolean;
        jsonResultObj:any;
        constructor(private _router:Router, private routeServ:RouteService) {
            this.routesReady = false;
        }

    ngOnInit(){
        console.log("ngOnInit");
    }

    /**
     * All route paths must be lazy loaded (use http.get)
     */
    loadAllLazyRoutes(data : any){
       let routes : any[] = data;
       routes.forEach((route : any) => {
            this.routeConfigArray.push(
                new AsyncRoute({
                    path : route.path,
                    loader : () => System.import(route.resource).then(m => m[route.component]),
                    name : route.name
                })
            );
            this.dynamicRouteViewArray.push({'name': route.name, 'route' : route.route})
        });
        this._router.config(this.routeConfigArray);
        this.routesReady = true;
    }

    /***
     * Using http
     */
    loadAllLazyRoutesHttp(data : any){

    }

    /**
     * Method that loads routes based on user combobox selection
     * @param selectedRoutes
     */
    updatePageRoutes(selectedRoutes : string){
            this.routesReady = false;
            if(selectedRoutes==1){
                 //console.log("fetch service with single route");
                 // json file name : singleroute.json
                 this.jsonResultObj = this.routeServ.fetchUserSelectedRoutes('setone.json');
                 this.loadAllLazyRoutes(this.jsonResultObj);
                //Http get
                this.setAppRoutes.bind(this);

             }
            else{
                 this.jsonResultObj = this.routeServ.fetchUserSelectedRoutes('settwo.json');
                 this.loadAllLazyRoutes(this.jsonResultObj);
             }
        }

    /**
     * Sets the user selected Routes-View
     * @param data = JSON Object from service
     */
    processRoutes(data :any){
            let routeComponentName: any;
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].path + " " + data[i].name + " " + data[i].component);

                routeComponentName = data[i].component;//data[i].component.replace(/\"/g, "");

                //var transcName = 'about_component_1';
                //let testClassName =eval("new about_component_1.AboutComponent()"); //eval(transcName[data[i].component]);//Object.create(window['AboutComponent'].prototype);//new window[routeComponentName]; //eval("new AboutComponent()")//new AboutComponent();


                /***
                 * Get instantiated object from string
                 */
                let testClassName = this.getComponent(routeComponentName);
                this.routeConfigArray.push({'path': data[i].path,'name' : data[i].name, 'component' : testClassName.constructor})
                this.dynamicRouteViewArray.push({'name': data[i].name, 'route' : data[i].route});
            }
            //console.log(this.routeConfigArray);
            this._router.config(this.routeConfigArray);
            this.routesReady = true;
        }


    /**
     * Sets the route array and updates view
     * @param data = JSON object from service
     */
    setRouteConfig(data:any) {
            let routeComponentName: any;
            let temp;
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].path + " " + data[i].name + " " + data[i].component);

                routeComponentName = data[i].component;//data[i].component.replace(/\"/g, "");

                //var transcName = 'about_component_1';
                //let testClassName =eval("new about_component_1.AboutComponent()"); //eval(transcName[data[i].component]);//Object.create(window['AboutComponent'].prototype);//new window[routeComponentName]; //eval("new AboutComponent()")//new AboutComponent();


                /***
                 * Get instantiated object from string
                 */
                let testClassName = this.getComponent(routeComponentName);
                this.routeConfigArray.push({'path': data[i].path,'name' : data[i].name, 'component' : testClassName.constructor});
                this.dynamicRouteViewArray.push({'name': data[i].name, 'route' : data[i].route});
            }
            //console.log(this.routeConfigArray);
            this._router.config(this.routeConfigArray);
            this.routesReady = true;
        }


    /**
     * Returns a instance of class from classname in a string format when transpiled into js code.
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

    /**
     * Sets Route paths
         */
        setAppRoutes(routePathValue:any, routeNameValue:any, routeComponent:any) {

            // Calls service to fetch paths from json
            var contextHandle = this;
            this.routeServ.fetchRouterConfig(this, function (data) {
                var handle = this;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    //console.log(data[i].path+" "+data[i].name+" "+data[i].component);
                    contextHandle.routeConfigArray.push({
                        'path': data[i].path,
                        'name': data[i].name,
                        'component': data[i].component
                    });
                    contextHandle._router.config(contextHandle.routeConfigArray);   // THIS FAILS TO CONFIG PATHS ON ROUTER
                }
                //contextHandle._router.config(contextHandle.routeConfigArray);
                console.log("--Config Array Contents--");
                //console.log(routeConfigArray);
            });

            //Loading data into RouteDefinition Array
            //this.routeConfigArray.push({'path': routePathValue, 'name' : routeNameValue , 'component' : routeComponent});

            //console.log(this.routeConfigArray);
            //this._router.config(this.routeConfigArray);
            this._router.config([
                {'path': routePathValue, 'name': routeNameValue, 'component': routeComponent}
            ]);


        }


    }


