import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Namespace, Socket} from "socket.io";
import {Logger} from '@nestjs/common'
import {AuthService} from "../auth/auth.service";
import {JwtService} from '@nestjs/jwt';
import {stockingmec} from "../cordmessage/driver-tracker-stockin-mechanism/stockin-mechanism.service";
import {ridefinder} from "../cordmessage/cordfilter/filter";
import process from "process";

@WebSocketGateway({namespace : "events" ,cors: {origin : "* "}})
export class eventgateway implements OnGatewayConnection,OnGatewayDisconnect{

    constructor(private authserve : AuthService , private  jwtserv : JwtService, private satockingmec : stockingmec,private finder : ridefinder) {
    }


    private readonly logger = new Logger(eventgateway.name);

    @WebSocketServer()
    io: Namespace;
    s : Socket ;
    @SubscribeMessage("joinRoom")
    handleJoinRoom(client: Socket, userId: string): void {
        client.join(userId);
    }
    @SubscribeMessage("joinRoom")
    handlestart(client: Socket, userId: string): void {
        client.join(userId);
    }




    @SubscribeMessage('drivertracking')
  async  handleSendData( @ConnectedSocket() client: Socket,@MessageBody() data: any ) {
         data.idonsocket = client.id
        await this.satockingmec.adddriver(data)
        const newdata = await this.satockingmec.getTempValues()
        const freedriver =  await  this.satockingmec.getfree()
        const onride  = await this.satockingmec.getonride(newdata)
        const onrideshared = await  this.satockingmec.getonrideshared(onride)
        freedriver.map(driver=>console.log("frree"+driver.id))

        this.io.emit('freedrivers' ,freedriver)
        this.io.emit('onrideshared',onrideshared)

    }
    @SubscribeMessage('drivertrackingonride')
    async handleSendDataonride(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log("on driver track" + data.driver);
        if (data.client && data.client.user && data.client.user.id) {
            const idonsocket = this.satockingmec.getaclientbyid(data.client.user.id);
            if (data.client2 && data.client2.user && data.client2.user.id) {
                const idonsocket2 = this.satockingmec.getaclientbyid(data.client2.user.id);
                console.log(idonsocket2, "+++++++++++++", idonsocket);
                this.io.to(idonsocket).to(idonsocket2).emit('driver', data.driver);
            } else {
                console.log(idonsocket);
                this.io.to(idonsocket).emit('driver', data.driver);
            }
        }
    }

    @SubscribeMessage('onsideofroad')
    async driveronsideofroad(@ConnectedSocket() client: Socket,@MessageBody() data: any){
        const accept = true
        console.log("arrived")
        const idonsocket =   this.satockingmec.getaclientbyid(data.user.id)
            this.io.to(idonsocket).emit('driverarrived' , accept)
    } @SubscribeMessage('price')
    async price(@ConnectedSocket() client: Socket,@MessageBody() data: any){
        console.log("d11111111111111"+ data.d1)
        console.log("d11111111111111"+ data.d2)
        console.log("tooooooooooooootalllleee"+ data.total)
          const total =  data.total
          const d1 = data.d1
          const d2 = data.d2
        const fare1 = (total * d1) / (d1 + d2);
        const fare2 = (total * d2) / (d1 + d2);
        console.log("fare1"+ fare1)
        console.log("fare1"+ fare2)
        const idonsocket2 =   this.satockingmec.getaclientbyid(    data.client2.user.id)
        const idonsocket1 =   this.satockingmec.getaclientbyid(    data.client1.user.id)
            this.io.to(idonsocket1).emit('cost' , fare1)
            this.io.to(idonsocket2).emit('cost' , fare2)
    } @SubscribeMessage('ridestarted')
    async startride(@ConnectedSocket() client: Socket,@MessageBody() data: any){
        console.log("ride started")
         await this.satockingmec.changestatus(data.driver.id ,data.client.status)
        console.log("+++++++++++++++++",data.res.tripid)
        const idonsocket =   this.satockingmec.getaclientbyid(data.client.user.id)
        console.log(idonsocket)
            this.io.to(idonsocket).emit('ridebegan' , data.driver.id)
    }
    @SubscribeMessage('command')
    async handleSendcommands(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        const freedriver = await this.satockingmec.getfree();
        console.log(data.pickup)
        if(freedriver.length>0){

            const driver = await this.finder.nearest(data.pickup, freedriver);
            console.log(driver.idonsocket , driver.data)
            this.io.to(driver.idonsocket).emit("comandtodriver", data);
        }
        else{
            const res = true
            this.io.to(client.id).emit('naanfound',res)

        }

    }
    @SubscribeMessage('cancelcommand')
    async handlecancelcommand(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        const driver    =await this.satockingmec.getdriver_byid(data.driver.id)
        console.log("here is "+ driver)
        this.io.to(driver).emit("cancelfromclient", data.client);
    }  @SubscribeMessage('finished')
    async handlecancelfinished(@ConnectedSocket() client: Socket, @MessageBody() data: any) {


        console.log("here is "+ data.client1)
        const client1    =await this.satockingmec.getaclient(data.client1)

        this.io.to(client1.idonsocket).emit("finishedride",data.driver )
        if(data.client2){
            const client2    =await this.satockingmec.getaclient(data.client2)
            console.log("here is "+ client2)
            this.io.to(client2.idonsocket).emit("finishedride",data.driver )
        }
    }
    @SubscribeMessage('cancel')
    async handleget(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        const client1    =await this.satockingmec.getaclient(data)

        this.io.to(client1.idonsocket).emit("canceledfromdriver",data )
     

    }



    @SubscribeMessage('getinshared')
    async handleSendsharedcommands(@ConnectedSocket() client: Socket, @MessageBody() data: any) {


               const road = await this.satockingmec.gettrip(data.tripid)

               if (road){
                   this.io.to(data.driver.idonsocket).emit("comandtodriver", data)}
    }
    @SubscribeMessage('sharedridestarted')
    async handleSharedRide(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        this.satockingmec.changestatus(data.driver.id , data.client.status)
        const idonsocket =   this.satockingmec.getaclient(data.client.user.id)
        this.io.to(idonsocket).emit("cordforshared", data)
    }@SubscribeMessage('changestatus')
    async changestatus(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        this.satockingmec.changestatus(data.driver.id , data.status)
    }@SubscribeMessage('inisialize')
    async inisialize(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log(data)
        this.satockingmec.changestatus(data , 0)

    }

    @SubscribeMessage('sharedridedfinder')
    async handleSharedRidefinder(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
                let drivers     = await this.satockingmec.getTempValues()
        console.log(drivers[0])
                 drivers =    drivers.filter(obj=>obj.stat == 2)
        console.log("driiiiiiiiiiiiiiiiiver"+drivers[0])
        if (data.status ==2&& drivers.length>0) {
            console.log("222222222222222222222222222222")
            drivers.map(async (driver)=>{
           const  trip = this.satockingmec.gettripwithdriverid(driver.id)
                console.log("here are shared drivers: " + trip);
                if (trip.road) {
                    const g = this.finder.sharedfinder(trip.road,[data.pickup.longitude,data.pickup.latitude] , data.destination.geometry.coordinates);
                    if (g) {
                        console.log(data.user.id)
                        this.io.to(driver.idonsocket).emit("secondclient", data);
                        const res = true;this.io.to(client.id).emit("founded", res);
                    }}})
        }else if(data.status == 3){
            const freedriver = await this.satockingmec.getfree();
            console.log(data.pickup)
            data.status = 2
            if(freedriver.length>0){
                const driver = await this.finder.nearest(data.pickup, freedriver);
                console.log(driver.idonsocket , driver.data)
                this.io.to(driver.idonsocket).emit("comandtodriver", data);
            }else  { // no actual rides
                console.log("no drivers for now ");
                const res = true;
                this.io.to(client.id).emit("nonfounded", res);
            }

        }
        else { // no actual rides
            console.log("not found");
            const res = true;
            this.io.to(client.id).emit("nonfounded", res);
        }

    }

    @SubscribeMessage('updatetrip')
    async handletrip(@ConnectedSocket() driver: Socket, @MessageBody() data: any){
      await  this.satockingmec.addtrip(data).then(()=>console.log("trip added")).catch(()=>console.log("error adding trip"))
    }

    @SubscribeMessage('accept')
    async handleacceptedrid(@ConnectedSocket() driver: Socket, @MessageBody() data: any) {
        console.log("papapappapa" + data.client);
        const client1 = this.satockingmec.getaclientbyid(data.client.user.id)
            console.log(client1)
            this.io.to(client1).emit("acceptedfromdriver", data);


    }
    @SubscribeMessage('declinedfromdriver')
    async handledeclined(@ConnectedSocket() client: Socket,@MessageBody() data: any ){

        console.log("++++++++++++55565656"+data)
        const client1 = await this.satockingmec.getaclient(data)
        this.io.to(client1.idonsocket).emit("declin",data)

    }



    @SubscribeMessage('joinride')
    async handlejoinride(@ConnectedSocket() client: Socket,@MessageBody() data: any ){

        console.log("++++++++++++55565656"+data.driverid)
        const idonsocket = await this.satockingmec.getdriver_byid(data.driverid)
        this.io.to(idonsocket).emit("addedclient",data.client)

    }



    async  handleclientmessage (@ConnectedSocket() clientdetect: Socket,@MessageBody() data: any ) {
        data.idonsocket = clientdetect.id


    }
    sendmessage(@MessageBody() driverinfo : string) : void{
        this.io.emit('clientdss', {driverinfo})
    }



    async handleConnection(client: Socket ) {
        const sockets = this.io.sockets;
        console.log('HANDLE CONNECTION');
        const cockie = client.handshake.headers.authorization
        console.log(cockie)
        const j = cockie.indexOf('; ')
        if(j!==-1){ let cookies = cockie.split('; ');
            let tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
            if (tokenCookie){
                const i = tokenCookie.indexOf("=")

                if ( i!== -1){
                    const jwt = tokenCookie.split('=')[1]
                    console.log(jwt)

                }


            }}


console.log(cockie)
    const jwt = cockie
         if (jwt){
            const token = jwt.split("%")[1];
            console.log("++++++++++++++++++"+token)
             const [header, payload, signature] = token.split('.');
             const decodedPayload = JSON.parse(atob(payload));
            if (decodedPayload) {
                client.data.user = decodedPayload;
                console.log(decodedPayload)
                if (client.data.user.type== 'driver'){
                    client.join('drivergroup');
                    this.logger.log(`WS driver with id: ${client.id} connected!`);
                    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
                }
                else if (client.data.user.type == "client")       {
                    const newclient = {
                        data  : client.data,
                        idonsocket : client.id
                    }
                      this.satockingmec.addclient(newclient)
                    console.log(client.data.user)
                    this.logger.log(`WS client with id: ${client.id} connected!`);
                    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
                }
            }

        }
         else
         {
            console.log("here")
         }



    }
    handleDisconnect(client: Socket): any {
        this.satockingmec.deleteclient(client)
        this.satockingmec.deletedriver(client)
        const sockets = this.io.sockets;
        this.logger.log(`Disconnected socket id: ${client.id}`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    }

}
