import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Response,
  Request,
  UploadedFile,
  UseInterceptors, BadRequestException, Query
} from '@nestjs/common';
import { TestApiService } from './test_api.service';
import {userdto} from './dto/test.dto'
import {trip} from "../elements/tripp/trip";

import {FileInterceptor} from "@nestjs/platform-express";
import {treatment} from "../img_treatment/imgt";
import {uploader} from "../img_treatment/uploader";


@Controller('test-api')
export class TestApiController {

  constructor(private readonly testApiService: TestApiService , private treat : treatment,private uploader : uploader) {}

  @Post("/signup")
  signup(@Request() req, @Response() res, @Body() user: any ){
    return this.testApiService.signup(user,req,res)
  }
    @Post("/signupclient")
    signupclient(@Request() req, @Response() res, @Body() user: any ){
        return this.testApiService.signupclient(user,req,res)
    }
    @Post('/logindriver')
    async login(@Request() req, @Response() res,@Body() body: any): Promise<any> {
        return this.testApiService.signindriver(body,req, res);
    }  @Post('/loginclient')
    async loginclient(@Request() req, @Response() res,@Body() body: any): Promise<any> {
        return this.testApiService.signinclient(body,req, res);
    }

  @Post('uploader')
  @UseInterceptors(FileInterceptor('photo' ))
  async ipload(@UploadedFile() file  : Express.Multer.File,@Request() req, @Response() res ){
   const from =  await this.testApiService.img_manage(file   )
      console.log(from)
     return  res.json(from);
    }  @Post('uploadercartegrise')
  @UseInterceptors(FileInterceptor('photo' ))
  async iploadcartegrise(@UploadedFile() file  : Express.Multer.File,@Request() req, @Response() res){
   const from =  await this.testApiService.img_manage_gray_card(file  )
      console.log(from)
     return  res.json(from);
    }
    @Post('rate')
  async rate(@Body() data : any,@Request() req, @Response() res){
     return  await this.testApiService.rate(data , req ,res )


    }
    @Post('sms')
    async sendSms(@Body() body: { number: string}) {
        try {
           console.log(body.number)
            const result = await this.testApiService.sendSms(body.number);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response.data.requestError.serviceException.variables,
            };
        }
    }
    @Get(':number/:code')
   async getValue(@Param('number') number: string, @Param('code') code: string) {
        try {
            const result = await this.testApiService.checkotp(number,code);
            return { success: true};
        } catch (error) {
            return {
                success: false,
                error: error.response.data.requestError.serviceException.variables,
            };
        }
    }

    @Post('signin')
    async signin(@Request() req, @Response() res, @Body() user: any ) {
        return this.testApiService.signindriver(user, req, res);
    }  @Post('sharedtripstarter')
    async sharedtripstarter(@Request() req, @Response() res, @Body() trip : any ) {
        return this.testApiService.sharedtripstarter(trip, req, res);
    }
    @Post('tripstarter')
    async tripstarter(@Request() req, @Response() res, @Body() data : any   ) {
        return this.testApiService.tripstarter(data, req, res);
    }  @Post('newintring')
    async newintring(@Request() req, @Response() res, @Body() data : any   ) {
        return this.testApiService.newintering(data, req, res);
    }
    @Post('/findtrip')
    async getDriverTripId(@Request() req, @Response() res, @Body("data") data : number   ) {

        return this.testApiService.getDriverIdByTripId(data, req, res);
    }
    @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.testApiService.signout(req, res);
  }
  @Get('delete-image')
  async delete(@Query('filename') filename,@Response() res ){
    await this.uploader.delete(filename);
    return res = "deleted";
  }
    @Post('checknumber')
    async check(@Body() body: any,@Request() req,@Response() res ){

        return this.testApiService.checknumber(body , req , res)
    } @Post('checknumberdriver')
    async checknumber(@Body() body: any,@Request() req,@Response() res ){

        return this.testApiService.checknumberdriver(body , req , res)
    }
    @Post("finished")
async finished(@Request() req, @Response() res, @Body() data : any ){
   return   await  this.testApiService.finished(data , req , res)


    }

}
