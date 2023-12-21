import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { RoomModel } from './models/room/room.model';
import { GameService, GameView } from './game.service';
import { GameModel, GameStatus } from './game/game.model';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  rooms$ = new BehaviorSubject<RoomModel[]>([]);
  game: GameService;

  constructor() { }

  setupSocketConnection() {
    // sets up connection
    this.socket = io("http://localhost:3000");

    // listening to events
    this.socket.on('roomList', (data: RoomModel[]) => {
      this.rooms$.next(data)
      console.log(data);
    })

    // nav to joined room
    this.socket.on('navToGameView', (data: GameModel) => {
      this.game.view = GameView.Game;
      this.game.setGame(data);
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
    // create game after receiving ok from server
    // gameService.createGame(this.socket.id);
  }

  joinRoom(id:string){
    this.socket.emit('joinRoom', id);
    // join game after receiving ok from server
    // gameService.joinGame(this.socket.id)
  }

  getRooms():Observable<RoomModel[]>{
    return this.rooms$;
  }

  setGameService(gameService: GameService){
    this.game = gameService;
  }

  getGameService(){
    return this.game;
  }
}
