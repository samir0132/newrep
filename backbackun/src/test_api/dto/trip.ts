import {IsNotEmpty, IsString } from "class-validator";

export class trip {
    @IsNotEmpty()
    driverid : any ;
    @IsString()
    drivername : string
    @IsNotEmpty()
    clientid : any ;
    @IsString()
    username : string ;




}