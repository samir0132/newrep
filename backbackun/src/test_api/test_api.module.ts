import { Module } from '@nestjs/common';
import { TestApiService } from './test_api.service';
import { TestApiController } from './test_api.controller';
import {PrismaModule} from "../../prisma/prisma.module";
import {JwtModule} from '@nestjs/jwt'
import {GatewayModule} from "../gateway/gateway.module";
import {ConfigModule} from "@nestjs/config";
import {treatment} from "../img_treatment/imgt";
import {uploader} from "../img_treatment/uploader";
import {OtpService} from "../img_treatment/otpservice";

@Module({
  controllers: [TestApiController],
  providers: [TestApiService,treatment,uploader,OtpService],

  imports :[ConfigModule.forRoot(),PrismaModule,JwtModule,GatewayModule]
})
export class TestApiModule {}
