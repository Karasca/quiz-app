import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { RoomModel } from './models/room/room.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  

  private socket = io('http://localhost:3000');

  join(){
    this.socket.emit('getRoomList');
  }

  getRoomList(){
    console.log('getRoomList');
  }

}
