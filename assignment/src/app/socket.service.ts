import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

	private url = 'http://localhost:3000';
    private socket;    

    constructor(private http: Http) {
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket = io();
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        });
    }
}
