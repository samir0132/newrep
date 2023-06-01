import { Module } from '@nestjs/common';


import {HttpModule} from "@nestjs/axios";
import { TestApiModule } from './test_api/test_api.module';
import {OtpService} from "./img_treatment/otpservice";
import {GatewayModule} from "./gateway/gateway.module";


@Module({
  imports: [HttpModule, TestApiModule,GatewayModule],

})
export class AppModule {}
