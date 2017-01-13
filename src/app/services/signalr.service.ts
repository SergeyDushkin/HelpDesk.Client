import { User } from "../models/user";
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { RequestService } from '../services/request.service';

import 'ms-signalr-client';

declare var $;

/*
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Disconnected"] = 0] = "Disconnected";
    ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
})(ConnectionState || (ConnectionState = {}));
class Connection {

    private dataReceivedCallback : any;
    private connectionClosedCallback : any;
    private url : any;
    private queryString : any;
    private connectionState : any;
    private transport : any;
    private connectionId : any;

    constructor(url, queryString = "") {
        this.dataReceivedCallback = (data) => { };
        this.connectionClosedCallback = (error) => { };
        this.url = url;
        this.queryString = queryString;
        this.connectionState = ConnectionState.Disconnected;
    }

    start(transportName = 'webSockets') {
        if (this.connectionState != ConnectionState.Disconnected) {
            throw new Error("Cannot start a connection that is not in the 'Disconnected' state");
        }
        this.transport = this.createTransport(transportName);
        this.transport.onDataReceived = this.dataReceivedCallback;
        this.transport.onError = e => this.stopConnection(undefined);
        return new HttpClient().get(`${this.url}/getid?${this.queryString}`)
            .then(connectionId => {
            this.connectionId = connectionId;
            this.queryString = `id=${connectionId}&${this.connectionId}`;
            return this.transport.connect(this.url, this.queryString);
        })
            .then(() => {
            this.connectionState = ConnectionState.Connected;
        })
            .catch(e => {
            console.log("Failed to start the connection.");
            this.connectionState = ConnectionState.Disconnected;
            this.transport = null;
            throw e;
        });
    }
    createTransport(transportName) {
        if (transportName === 'webSockets') {
            return new WebSocketTransport();
        }
        if (transportName === 'serverSentEvents') {
            return new ServerSentEventsTransport();
        }
        if (transportName === 'longPolling') {
            return new LongPollingTransport();
        }
        throw new Error("No valid transports requested.");
    }
    send(data) {
        if (this.connectionState != ConnectionState.Connected) {
            throw new Error("Cannot send data if the connection is not in the 'Connected' State");
        }
        return this.transport.send(data);
    }
    stop() {
        if (this.connectionState != ConnectionState.Connected) {
            throw new Error("Cannot stop the connection if it is not in the 'Connected' State");
        }
        this.stopConnection(undefined);
    }
    stopConnection(error) {
        this.transport.stop();
        this.transport = null;
        this.connectionState = ConnectionState.Disconnected;
        this.connectionClosedCallback(error);
    }
    set dataReceived(callback) {
        this.dataReceivedCallback = callback;
    }
    set connectionClosed(callback) {
        this.connectionClosedCallback = callback;
    }
}
class HttpClient {
    get(url) {
        return this.xhr("GET", url, undefined);
    }
    post(url, content) {
        return this.xhr("POST", url, content);
    }
    xhr(method, url, content) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            if (method === "POST" && content != null) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            xhr.send(content);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
        });
    }
}
class LongPollingTransport {
  
    private url : any;
    private queryString : any;

    connect(url, queryString) {
        this.url = url;
        this.queryString = queryString;
        this.poll(url + "/poll?" + this.queryString);
        return Promise.resolve();
    }
    poll(url) {
        let thisLongPollingTransport = this;
        let pollXhr = new XMLHttpRequest();
        pollXhr.onload = () => {
            if (pollXhr.status == 200) {
                if (thisLongPollingTransport.onDataReceived) {
                    thisLongPollingTransport.onDataReceived(pollXhr.response);
                }
                thisLongPollingTransport.poll(url);
            }
            else if (this.pollXhr.status == 204) {
            }
            else {
                if (thisLongPollingTransport.onError) {
                    thisLongPollingTransport.onError({
                        status: pollXhr.status,
                        statusText: pollXhr.statusText
                    });
                }
            }
        };
        pollXhr.onerror = () => {
            if (thisLongPollingTransport.onError) {
                thisLongPollingTransport.onError({
                    status: pollXhr.status,
                    statusText: pollXhr.statusText
                });
            }
        };
        pollXhr.ontimeout = () => {
            thisLongPollingTransport.poll(url);
        };
        this.pollXhr = pollXhr;
        this.pollXhr.open("GET", url, true);
        // TODO: consider making timeout configurable
        this.pollXhr.timeout = 110000;
        this.pollXhr.send();
    }
    send(data) {
        return new HttpClient().post(this.url + "/send?" + this.queryString, data);
    }
    stop() {
        if (this.pollXhr) {
            this.pollXhr.abort();
            this.pollXhr = null;
        }
    }
}
class RpcConnection {

    private connection : any;
    private callbacks : any;
    private methods : any;
    private id : any;

    constructor(url, queryString) {
        this.connection = new Connection(url, queryString);
        let thisRpcConnection = this;
        this.connection.dataReceived = data => {
            thisRpcConnection.dataReceived(data);
        };
        this.callbacks = new Map();
        this.methods = new Map();
        this.id = 0;
    }
    dataReceived(data) {
        //TODO: separate JSON parsing
        var descriptor = JSON.parse(data);
        if (descriptor.Method === undefined) {
            let invocationResult = descriptor;
            let callback = this.callbacks[invocationResult.Id];
            if (callback != null) {
                callback(invocationResult);
                this.callbacks.delete(invocationResult.Id);
            }
        }
        else {
            let invocation = descriptor;
            let method = this.methods[invocation.Method];
            if (method != null) {
                // TODO: bind? args?
                method.apply(this, invocation.Arguments);
            }
        }
    }
    start(transportName) {
        return this.connection.start(transportName);
    }
    stop() {
        return this.connection.stop();
    }
    invoke(methodName, ...args) {
        let id = this.id;
        this.id++;
        let invocationDescriptor = {
            "Id": id.toString(),
            "Method": methodName,
            "Arguments": args
        };
        let p = new Promise((resolve, reject) => {
            this.callbacks[id] = (invocationResult) => {
                if (invocationResult.Error != null) {
                    reject(invocationResult.Error);
                }
                else {
                    resolve(invocationResult.Result);
                }
            };
            //TODO: separate conversion to enable different data formats
            this.connection.send(JSON.stringify(invocationDescriptor))
                .catch(e => {
                // TODO: remove callback
                reject(e);
            });
        });
        return p;
    }
    on(methodName, method) {
        this.methods[methodName] = method;
    }
    set connectionClosed(callback) {
        this.connection.connectionClosed = callback;
    }
}
// TODO: need EvenSource typings
class ServerSentEventsTransport {
    connect(url, queryString) {
        if (typeof (EventSource) === "undefined") {
            Promise.reject("EventSource not supported by the browser.");
        }
        this.queryString = queryString;
        this.url = url;
        let tmp = `${this.url}/sse?${this.queryString}`;
        return new Promise((resolve, reject) => {
            let eventSource = new EventSource(`${this.url}/sse?${this.queryString}`);
            try {
                let thisEventSourceTransport = this;
                eventSource.onmessage = (e) => {
                    if (thisEventSourceTransport.onDataReceived) {
                        thisEventSourceTransport.onDataReceived(e.data);
                    }
                };
                eventSource.onerror = (e) => {
                    reject();
                    // don't report an error if the transport did not start successfully
                    if (thisEventSourceTransport.eventSource && thisEventSourceTransport.onError) {
                        thisEventSourceTransport.onError(e);
                    }
                };
                eventSource.onopen = () => {
                    thisEventSourceTransport.eventSource = eventSource;
                    resolve();
                };
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    send(data) {
        return new HttpClient().post(this.url + "/send?" + this.queryString, data);
    }
    stop() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
}
class WebSocketTransport {

    private webSocket : WebSocket;
  
    connect(url, queryString = "") {
        return new Promise((resolve, reject) => {
            url = url.replace(/^http/, "ws");
            let connectUrl = url + "/ws?" + queryString;
            this.webSocket = new WebSocket(connectUrl);
            let thisWebSocketTransport = this;
            this.webSocket.onopen = (event) => {
                console.log(`WebSocket connected to ${connectUrl}`);
                thisWebSocketTransport.webSocket = this.webSocket;
                resolve();
            };
            this.webSocket.onerror = (event) => {
                reject();
            };
            this.webSocket.onmessage = (message) => {
                console.log(`(WebSockets transport) data received: ${message.data}`);
                if (thisWebSocketTransport.onDataReceived) {
                    thisWebSocketTransport.onDataReceived(message.data);
                }
            };
            this.webSocket.onclose = (event) => {
                // webSocket will be null if the transport did not start successfully
                if (thisWebSocketTransport.webSocket && event.wasClean === false) {
                    if (thisWebSocketTransport.onError) {
                        thisWebSocketTransport.onError(event);
                    }
                }
            };
        });
    }
    send(data) {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in OPEN state");
    }
    stop() {
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
        }
    }
}
*/

@Injectable()
export class SignalRService {

    private proxy;
    private proxyName: string = 'ServiceDeskHub';
    private connection;

    public messageReceived: EventEmitter<string>;
    public connectionEstablished: EventEmitter<Boolean>;
    public connectionExists: Boolean;

    constructor() {
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.messageReceived = new EventEmitter<string>();
        this.connectionExists = false;

        this.connection = $.hubConnection('http://localhost:15000/hub');
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
