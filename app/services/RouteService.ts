/**
 * Created by pratik on 7/3/16.
 */
import{Injectable}   from 'angular2/core';
import { Http, HTTP_PROVIDERS,Response} from 'angular2/http';

@Injectable()
export class RouteService{
    resultObject : any;
    constructor(private _http : Http){

    }

    /**
     * Read from local json
     */
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
     * fetch using jquery ajax call
     */
    syncFetchRouterConfig(){
            var context = this;
            //console.log("b4 call");
            $.ajax({
                type: 'GET',
                url: '/lazy-routing/singleroute.json',    //  /lazy-routing/routes.json  || /lazy-routing/singleroute.json
                data: this.resultObject,
                async:false,
                dataType: 'json',
                success: function(data, status, headers, config) {
                    console.log("ajax call");
                    //console.log(data);
                    context.resultObject = data;
                }
            });
        return this.resultObject;
        //    console.log("after call");
        //console.log(this.resultObject);

    }


    /**
     * fetch json based on input
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