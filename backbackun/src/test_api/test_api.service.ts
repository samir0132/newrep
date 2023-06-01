import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {userdto  } from "./dto/test.dto";
import {Temp_cordDto} from "./dto/temp_cord.dto";
import * as bcrypt from "bcrypt"
import {JwtService} from '@nestjs/jwt';
import {jwtsecret} from "./outil/jstuff";
import {Request,Response} from "express";
import {eventgateway} from "../gateway/gateway";
import {trip} from "../elements/tripp/trip";
import {payload} from "../elements/user/user/user.interface";
import {treatment} from "../img_treatment/imgt";
import {uploader} from "../img_treatment/uploader";
import axios from "axios";
import {OtpService} from "../img_treatment/otpservice";
import {errorContext} from "rxjs/internal/util/errorContext";
import { parseInt } from 'lodash';
@Injectable()
export class TestApiService {
    model_id = "bta9a-zamil"
    model_carte_grise = "cartegrise"
    model_assurance = ""
    constructor(private prisma : PrismaService, private jwt: JwtService, private  eventgateway : eventgateway , private uploader : uploader , private treat : treatment,private otp : OtpService) {
    }
    async signup(user: any, req: Request, res: Response) {

        let { number , password , fullname = "", birthdata = "", adresse = "", cin = "", carmodel = "", nameonvrd = "", carconstractor = "", typeofcar = "" } = user;
        number  = number.toString();
        // Hash password
      const  password1 = await this.hashpassword(password);

        // Create new user account
        const newUser = await this.prisma.driver.create({
            data: {
                number, password , fullname ,birthdata , adresse , cin , carmodel , nameonvrd ,  carconstractor , typeofcar,
                candrive: true,
                licenceV: true,
                accountstatut: true,
                totalworkingtime: 0,
                rate : 5 , numbrate : 0 ,
                accountcreationdate : new Date()
            },
        });
        // Sign JWT token and send to client
        const token = await this.signToken({ id: newUser.id, number: newUser.number });
        console.log(token)
       return  res.send({message : token} );
    }

    async signindriver(body: any, req: Request, res: Response) {
        let { number, password } = body;
        number = number.toString();
        const foundUser = await this.prisma.driver.findFirst({
            where: {
                number
            },
        });
        if (!foundUser) {
            return res.send({message: "user not found"})
        }
        const compareSuccess2 = await this.comparePasswords({
            password,
            hash: foundUser.password,
        });
        let compare = false
        if(password == foundUser.password){
             compare = true
        }


       // if (!compareSuccess) {
          //  throw new BadRequestException('Wrong password');
       // }
        if(compare){
            const token = await this.signToken({
                id: foundUser.id,
                number: foundUser.number,
            });

            if (!token) {
                throw new ForbiddenException('Could not signin');
            }

           return  res.send({message : token})


        }
        else return res.send({ message: 'worng password' });


    }
    async signupclient(user: any, req: Request, res: Response) {
        let { number, password } = user;
        number = number.toString();

        // Check if user already exists
        const userExists = await this.prisma.user.findFirst({
            where: { number :  number },
        });

        if (userExists) {
           return res.send({message : 'number in use'})
        }
        
        // Hash password
        //password = await this.hashpassword(password);

        // Create new user account
        const newUser = await this.prisma.user.create({
            data: {
                number,
                password,
            },
        });

        // Sign JWT token and send to client
        const token = await this.signTokenclient({ id: newUser.id, number: newUser.number });
        console.log(token)
        if(!token)return res.send({message : "not tokrn"})
          return  res.send({message : token})
    }
    async signinclient(body: any, req: Request, res: Response) {
        let { number, password } = body;
        number = number.toString();
        const foundUser = await this.prisma.user.findFirst({
            where: {
                number
            },
        });

        if (!foundUser) {
            return res.send({message: "user not found"})
        }

        const compareSuccess2 = await this.comparePasswords({
            password,
            hash: foundUser.password,
        });
        let compare = false
        if(password == foundUser.password){
            compare = true
        }


        // if (!compareSuccess) {
        //  throw new BadRequestException('Wrong password');
        // }
        if(compare){
            const token = await this.signTokenclient({
                id: foundUser.id,
                number: foundUser.number,
            });

            if (!token) {
                res.send({message : "token not"});
            }

            return  res.send({message : token})


        }
        else return res.send({ message: 'worng password' });


    }


    async signout(req: Request, res: Response) {
        res.clearCookie('token');

        return res.send({ message: 'Logged out succefully' });
    }
    async hashpassword(password : string){
const saltOrRounds = 10 ;
        return await bcrypt.hash(password, saltOrRounds)

    }
    async comparePasswords(args: { hash: string; password: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }
    async signToken(args: { id: any; number: any }) {
        const payload = {
            id: args.id,
            number: args.number,
            type: "driver"
        };

        const token = await this.jwt.signAsync(payload, {
            secret: jwtsecret,
        });

        return `Bearer ${token}`;
    }
    async signTokenclient(args: { id: any; number: any }) {
        const payload = {
            id: args.id,
            number: args.number,
            type: "client"
        };

        const token = await this.jwt.signAsync(payload, {
            secret: jwtsecret,
        });

        return `Bearer ${token}`;
    }

    async finduser (number : any ) {
        return   this.prisma.driver.findFirst({
            where: {
                number
            }
        });



    }
    async stockcords (driver_temp : Temp_cordDto ) {
        let {driverid , cords, date} = driver_temp
    }
     async checkwithpayload ( req : Request , res : Response ) {
        const payload  = req.body.payload




     }



    async sharedtripstarter(trip: any, req: Request, res: Response) {
        try {
            let { driverid, clientid1, shared,  totalprice } = trip;


            const result = await this.prisma.ride.create({
                data: {
                    driverid,
                    clientid1,
                    clientid2: 0,
                    shared,
                    startat :new Date(),
                    secondat : new Date(),
                    totalprice ,
                },
            });

            return res.send({ tripid: result.id });
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }


    async tripstarter (trip : any, req : Request , res : Response) {
        console.log(trip)
        let {driverid ,clientid,shared,pickup,finalpoint,status,triproad} = trip
        await  this.prisma.trip.create({
            data: {
                driverid,
                shared,
                pickup,
                finalpoint,
                triproad,
                status,
                finished : false

            },
        })
        return res.send("trip_started")

        }
    async newintering(data: any, req: Request, res: Response) {
        try {
            const id = data.driver.id;
            const trip = await this.prisma.ride.findFirst({ where: { id } });
            if (typeof trip.clientid2 === 'undefined' || trip.clientid2 === null || trip.clientid2 ===0 ){
                await this.prisma.ride.update({
                    where: { id: trip.id },
                    data: {
                        clientid2: data.client.user.id,
                    },
                });
                res.send('Success');
            } else {
                res.status(400).send('Invalid data');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }



    async img_manage(file : Express.Multer.File ) {
        if (!file) {
            throw new BadRequestException('File not an img')
        } else {
            return new Promise(async (resolve, reject) => {
                try {let model = ""
                    const url = await this.uploader.upload(file);
                    const form = await this.treat.recognizeForm(url, this.model_id);
                    if (form.confidence < 0.5) {
                        await this.uploader.delete(file.filename);
                        resolve("false");
                    } else {
                        resolve(form);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
    async img_manage_gray_card(file : Express.Multer.File ) {
        if (!file) {
            throw new BadRequestException('File not an img')
        } else {
            return new Promise(async (resolve, reject) => {
                try {let model = ""
                    const url = await this.uploader.upload(file);
                    const form = await this.treat.recognizeForm(url, this.model_carte_grise);
                    if (form.confidence < 0.5) {
                        await this.uploader.delete(file.filename);
                        resolve("false");
                    } else {
                        resolve(form);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
    async genToken() {
        const result = await axios
            .post(
                "https://api.orange.com/oauth/v3/token",
                {
                    grant_type: "client_credentials",
                },
                {
                    headers: {
                        Authorization: process.env.tokenAuth,
                        Accept: "application/json",
                        "content-type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((res) => res.data);
        return result.access_token;
    }
    async  getTripRoadById(id: number): Promise<any | null> {
        const trip = await this.prisma.trip.findUnique({
            where: { id },
        })
        if (trip && trip.status === 2) {
            return trip.triproad
        }
        return null
    }
    async rate(data : any , req : Request , res : Response){

        const driver =  await this.prisma.driver.findUnique({
            where: {
                id: data.driverid
            }
        });
         if (driver){

             const newrate = ((driver.rate * driver.numbrate )  + data.rate  )  /(driver.numbrate + 1)

             this.prisma.driver.update({
                 where: { id: driver.id },
                 data: {
                     rate: newrate,numbrate : (driver.numbrate + 1)
                 },
             }).then(()=>{
                return  res.send({message : "success"})
             }).catch(()=> {
                return  res.send({message: "invalid"})
             })


         }
         else {
            return  res.send({message : "invalid"})
         }


    }
    async finished(data  : any , req : Request , res : Response){

        this.prisma.trip.update({
            where: {id: data.tripid}, data: {finished: true}
        } ).then(()=>{
       return  res.send({message : "valid"})}).catch(()=>{
      return   res.send({message : "invalid" })
        })




    }

    async sendSms(recipient: string) {
        const token = await this.genToken();
        const devPhoneNumber = process.env.NUMBER_DEV;
        const code = this.otp.generateOtp()
        this.otp.storeOtp(recipient,code)
        return axios.post(
            `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B${devPhoneNumber}/requests`,
            {
                outboundSMSMessageRequest: {
                    address: `tel:+216${recipient}`,
                    senderAddress: `tel:+${devPhoneNumber}`,
                    outboundSMSTextMessage: {
                        message: code,
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
    }
    async checkotp(number , code) {

          const rcode=    this.otp.getOtp(number)
            return rcode == code;


    }

    async getDriverIdByTripId(data :number , req, res) {
        try {
            const trip = await this.prisma.ride.findUnique({
                where: {
                    id: data
                }
            });

            if (trip && !trip.clientid2) {
                console.log("User will receive");
                return res.json({ message: trip.driverid });
            } else {
                return res.json({ message: "Invalid trip" });
            }
        } catch (error) {
            console.error("Error retrieving trip:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async checknumber(body , req , res ){
        try {
            const val : string = body.number
          const userExists = await this.prisma.user.findFirst({
            where: {
             number :   val 
            }
          });
      
          if (!userExists) {
            return res.send({ success: true });
          } else {
            return res.send({ message: "used" });
          }
        } catch (error) {
          // Handle the error appropriately
          console.error(error);
          return res.send({ message: 'Error occurred' });
        }

    }
    async checknumberdriver(body: any, req: any, res: any) {
        try {
            const val : string = body.number
            console.log("vallll"+body.number)
          const userExists = await this.prisma.driver.findFirst({
         where: {
               number : val
            }
          });

          if (!userExists) {
            return res.send({ success: true });
          } else {
            return res.send({ message: "used" });
          }
        } catch (error) {
          // Handle the error appropriately
          console.error(error);
          return res.send({ message: 'Error occurred' });
        }
      }
      


}
