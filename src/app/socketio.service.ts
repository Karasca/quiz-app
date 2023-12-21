import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { GameService, GameView } from './game.service';
import { GameModel } from './game/game.model';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  rooms$ = new BehaviorSubject<GameModel[]>([]);
  game: GameService;

  constructor() { }

  setupSocketConnection() {
    // sets up connection
    this.socket = io("http://localhost:3000");

    // listening to events
    this.socket.on('roomList', (data: GameModel[]) => {
      this.rooms$.next(data)
      console.log('roomlist: ', data);
    })

    // nav to joined room
    this.socket.on('navToGameView', (data: GameModel) => {
      this.game.view = GameView.Game;
      console.log("navToGameView: ", data);
      this.game.setGame(data);
    })

    // game is full
    this.socket.on('gamefull', () => {
      console.log("game full.");
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
    console.log('joining room: ', id);
    this.socket.emit('joinRoom', id);
    // join game after receiving ok from server
    // gameService.joinGame(this.socket.id)
  }

  getRooms():Observable<GameModel[]>{
    return this.rooms$;
  }

  setGameService(gameService: GameService){
    this.game = gameService;
  }

  getGameService(){
    return this.game;
  }
}
