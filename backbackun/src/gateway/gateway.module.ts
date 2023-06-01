import {Module} from "@nestjs/common";
import {eventgateway} from "./gateway";
import {messagecord} from "src/cordmessage/entities/message.entity";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {stockingmec} from "../cordmessage/driver-tracker-stockin-mechanism/stockin-mechanism.service";
import {ridefinder} from "../cordmessage/cordfilter/filter";
import {TestApiModule} from "../test_api/test_api.module";
import {TestApiService} from "../test_api/test_api.service";


@Module({
    providers : [eventgateway,messagecord,AuthService, JwtService, stockingmec,ridefinder  ],
    exports : [eventgateway],
})
export class GatewayModule {
    
}