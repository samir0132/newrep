import {TestApiService} from "../../test_api/test_api.service";

export class stockingmec {
    constructor( private apiservice : TestApiService) {
    } lag1 : any =10.1409473
    lng1 : any = 36.8287876
    private  _tempValues = [
    ] ;
    private _tempclient = [];



    private _temptrip = []

    async  getonrideshared(data : any ) {
        let newdata : any [] = [] ;
        data.map(value => {
            if( value.stat == 2) {
                newdata.push( value )
            }

        })
        return newdata
    }
     getallclients(){
        return this._tempclient
    }
    async getDriversByStatus(status: any) {
        return this._tempValues.filter(value => value.status === status);
    }

   async getdriver_byid(id: any) {
        const foundClient = await this._tempValues.find(value => value.id === id);
        if (foundClient) {
            console.log("founded")
            return foundClient.idonsocket.toString();
        }
    }
    async  getonride(data : any) {
        let newdata : any [] = [] ;
        data.map(value => {
            if( value.stat == 1 || 2 ) {
                newdata.push( value )
            }
        })
        return newdata

    }
    addclient(newclient: any): void {
        const index = this._tempclient.findIndex(client => client.data.user.id === newclient.data.user.id);

        if (index !== -1) {
            // Client already exists, update its socket ID
            this._tempclient[index].idonsocket = newclient.idonsocket;
            console.log(`Updated socket ID for client with ID ${newclient.data.user.id}`);
        } else {
            // Client doesn't exist, add it to the array
            this._tempclient.push(newclient);
            console.log(`Added new client with ID ${newclient.data.user.id}`);
        }
    }

    deleteclient(client) :void{
        this._tempclient = this._tempclient.filter(obj => obj.id !== client.id);
    }
    getaclient(client: any): any {
        const foundClient = this._tempclient.find(value => value.data.user.id === client.user.id);
        if (foundClient) {
            return foundClient;
        } else {
            console.log(`Could not find client with id ${client.user.id}`);
            return undefined;
        }
    }
    getaclientbyid(id: any): any {
        const foundClient = this._tempclient.find(value => value.data.user.id === id);
        if (foundClient) {

            return foundClient.idonsocket.toString();
        }
    }
    gettrip(tripid: any): any {
        const trip = this._temptrip.find(value => value.id === tripid);
        return trip ? trip : null;
    }
    gettripwithdriverid(driverid: any): any {
        const trip = this._temptrip.find(value => value.driverid === driverid);
        console.log(trip)
        return trip ? trip : null;
    }
    gettripsbystatus(status: any): any[] {
        const trips = this._temptrip.find(value => value.status === status);
        console.log("trips" , trips)
        return trips  ? trips : null;
    }


    async  getfree() {
        let newdata : any [] = [] ;
        this._tempValues.map(value => {
            if( value.stat == 0) {
                newdata.push( value )
            }


        })
        return newdata

    } async  getwithstat(status : number) {
        let newdata : any [] = [] ;
        this._tempValues.map(value => {
            if( value.stat == status) {
                newdata.push( value )
            }


        })
        return newdata

    }
async getTempValues() {
      return this._tempValues
}
     adddriver(driver: any): void {

         const index = this._tempValues.findIndex(obj => obj.id === driver.payload.id);
         if (index >= 0) {
             this._tempValues[index].coordinates = driver.coordinates;
         } else {
             this._tempValues.push({id  : driver.payload.id,name : driver.payload.name, coordinates:{longitude :driver.coordinates.longitude , latitude: driver.coordinates.latitude} , idonsocket : driver.idonsocket , date : driver.date,stat : driver.status });

         }

    }
    deletedriver(client : any) : void{
         this._tempValues = this._tempValues.filter(obj => obj.idonsocket !== client.id);
    }
    changestatus(id : any , status : number ) : void{
        this._tempValues.map(value => {
            if( value.id == id) {
                value.stat = status
            }


        })

    }
    async addtrip(data :any){

        const index = this._temptrip.findIndex(obj => obj.id === data.id);
        if (index >= 0) {
            this._temptrip[index].road = data.road;
        } else {
            this._temptrip.push({id  : data.id,road : data.road,driverid: data.driverid ,clientid : data.clientid,status : data.status });
        }
        console.log(index)

    }






}