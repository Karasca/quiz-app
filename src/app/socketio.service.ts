import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { RoomModel } from './models/room/room.model';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  rooms$ = new BehaviorSubject<RoomModel[]>([]);

  constructor() { }

  setupSocketConnection() {
    // sets up connection
    this.socket = io("http://localhost:3000");

    // listening to events
    this.socket.on('roomList', (data: RoomModel[]) => {
      this.rooms$.next(data)
      //console.log(data);
    })

    // nav to joined room
    this.socket.on('navToRoom', (data: RoomModel[]) => {
      console.log(data);
    })
  }



  // gets called when view gets destroyed
  disconnect(){
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  createRoom(){
    this.socket.emit('createRoom');
  }

  joinRoom(id:string){
    this.socket.emit('joinRoom', id);
  }

  getRooms():Observable<RoomModel[]>{
    return this.rooms$;
  }
}
