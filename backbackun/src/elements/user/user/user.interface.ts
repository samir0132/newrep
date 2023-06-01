import {Request} from "express";
import {Socket} from "socket.io";

export type User =  {
     email : string ;
     password : string ;

}
export class payload  {
     email : string ;
     id : any ;

}
export type requestwithauth = Request & User
export type socketwithauth = Socket & User

