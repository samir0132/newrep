import * as turf from "@turf/turf" ;
import {messagecord} from "src/cordmessage/entities/message.entity";
import {HttpService} from "@nestjs/axios";
import {Module} from "@nestjs/common";
import {mapboxacesstoken} from "../../test_api/outil/jstuff";



export class ridefinder {
    constructor() {
    }

    sharedfinder(gcords: any, cordb: [any, any], distination: [any, any]): any {
        let goodresult = 0;

        for (const g of gcords) {
            const from = turf.point(g);
            const to = turf.point(cordb);
            const diff = turf.distance(from, to, { units: 'meters' });
            console.log("diff1111111", diff);

            if (diff < 1000) {
                console.log("depart ok");
                goodresult += 1;
                break;
            }
        }

        for (let i = gcords.length - 1; i >= 0; i--) {
            const element = gcords[i];
            const from = turf.point(element);
            const Dto = turf.point(distination);
            const Ddiff = turf.distance(from, Dto, { units: 'meters' });

            if (Ddiff < 1000) {
                console.log("desstination ok");
                goodresult += 1;
                break;
            }
        }

        return goodresult === 2;
    }




    async filtring(clientcord : [lng: number, lat : number] , drivercord :messagecord []){
        drivercord.forEach((g : any)=>{
            //pick up point
            const from = turf.point(g);
            const to = turf.point(clientcord);
            const diff = turf.distance(from, to, {units: 'meters'})

            if (diff <1000 ){
                console.log("loock 2 "+ g)
                return g
            }

        })
    }
    cordverifyer(cords : any  , cordinates : any) : boolean{
        let cord =  turf.point(cords)
        let searchWithin = turf.polygon([cordinates]);
        let ptsWithin = turf.pointsWithinPolygon(cord, searchWithin);
        return !!ptsWithin;

    }
  async  nearest(cords : any, drivers : any[]) {
        const currentPoint = turf.point([cords.longitude, cords.latitude]);
        const driverPoints = drivers.map(driver =>
            turf.point([driver.coordinates.longitude, driver.coordinates.latitude])
        );
        const driverCollection = turf.featureCollection(driverPoints);
        const nearestDriver = turf.nearestPoint(currentPoint, driverCollection);
        return drivers.find(driver =>
            driver.coordinates.longitude === nearestDriver.geometry.coordinates[0] &&
            driver.coordinates.latitude === nearestDriver.geometry.coordinates[1]
        );
    }


    async sharedride(gcords : any,cordb : [any,any], distination : [any,any]){

        gcords.forEach((g : any)=>{
            //pick up point
            const from = turf.point(g);
            const to = turf.point(cordb);
            const diff = turf.distance(from, to, {units: 'meters'})

            //destination relate
            const Dto = turf.point(distination);
            const Ddiff = turf.distance(from, Dto, {units: 'meters'})
            if (diff <100 && Ddiff <100){
                console.log("pick up "+ diff, Ddiff +" all clear")
                console.log("loock 2 "+ g)

            }

        })
    }





}