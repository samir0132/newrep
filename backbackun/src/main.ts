import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import {eventgateway} from "./gateway/gateway";
import * as process from "process";
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
const port = process.env.PORT || 8080
  await app.listen(port);


app.useGlobalPipes(new ValidationPipe({whitelist : true}))
  console.log("all good ")
  const eventGateway = app.get(eventgateway)
  setInterval(() => eventGateway.sendmessage("."),2000)
}
bootstrap() ;
