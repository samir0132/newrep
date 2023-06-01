import {messagecord} from "src/cordmessage/entities/message.entity";
export interface ServerClientevents{
    newmessagecord : (playload : messagecord) => void ;
}