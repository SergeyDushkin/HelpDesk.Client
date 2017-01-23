import { User } from "../models/user";
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { RequestService } from '../services/request.service';
import { ConfigService } from '../services/config.service';

import 'ms-signalr-client';

declare var $;

@Injectable()
export class SignalRService {

    private proxy;
    private proxyName: string = 'ServiceDeskHub';
    private connection;

    public messageReceived: EventEmitter<string>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExists: Boolean;
    
    constructor(private configService : ConfigService) { 
        
        let url = configService.get("APP_HUB_URI");

        this.connectionEstablished = new EventEmitter<Boolean>();
        this.messageReceived = new EventEmitter<string>();
        this.connectionExists = false;

        this.connection = $.hubConnection(url);
        this.proxy = this.connection.createHubProxy(this.proxyName);

        /*
        $.signalR.ajaxDefaults.headers = { Authorization: "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2M2FkNjhlYWI0MzQ2ZjBjYjNmMjAwNTQ5MTA5OTM4IiwidHlwIjoiSldUIn0.eyJuYmYiOjE0NzU3NzA4NTUsImV4cCI6MTQ3NTc3NDQ1NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwL3Jlc291cmNlcyIsImNsaWVudF9pZCI6InJvLmNsaWVudCIsInN1YiI6IjgxODcyNyIsImF1dGhfdGltZSI6MTQ3NTc3MDg1NCwiaWRwIjoibG9jYWwiLCJuYW1lIjoiQWxpY2UgU21pdGgiLCJnaXZlbl9uYW1lIjoiQWxpY2UiLCJmYW1pbHlfbmFtZSI6IlNtaXRoIiwiZW1haWwiOiJBbGljZVNtaXRoQGVtYWlsLmNvbSIsInJvbGUiOlsidXNlciIsImF1ZGl0b3IiLCJwcmljZXNlcnZpY2UudXNlciJdLCJ3ZWJzaXRlIjoiaHR0cDovL2FsaWNlLmNvbSIsInNjb3BlIjpbImFwaTEiXSwiYW1yIjpbInBhc3N3b3JkIl19.K3dnGKcJHWk4AeLxHlVth-Yvo5L_E1oGrgHyt22eWUfGjXIuvAOB2rUYBkU_4zmVIlDBFuqG7FbSw1vXQC9HpftR2rrgTHreiF4nOM8How0UNsN1CDlt6GFtTSd9SwQQfyImicH9KSe1o74RFHP-HiX-oLdaYIqb-4HxlFl8aNNyL7Jxc1daE4rUMJXtLxPaNmXV5bxgaxqa7lA8MJ7fdBVT-2uNjt-hZ_pNbiqWhFL78_z9mqGTvtoTVUqbrGEA4Uio2kVtjZsvYzCgWw7u4Q8PZ8tMUuihHf7F_LSEQ7LMx4ULH5tyD5w9T8SJE3m8krS9m4AviGCGSWsJzGlmXw" };
*/
        this.registerOnServerEvents();

        this.startConnection();
    }

    public sendChatMessage(message: string) {
        this.proxy.invoke('SendMessage', message);
    }

    private startConnection(): void {
        this.connection.start().done((data) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }

    private registerOnServerEvents(): void {

        this.proxy.on('nextstatusset', (data: any) => {
            console.log('received in SignalRService: ' + JSON.stringify(data));
            this.messageReceived.emit(data);
        });

        this.proxy.on('setnewstatusrejected', (data: any) => {
            console.log('received in SignalRService: ' + JSON.stringify(data));
            this.messageReceived.emit(data);
        });
    }
}
