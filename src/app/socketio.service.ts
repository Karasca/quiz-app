import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { GameService, GameView } from './game.service';
import { GameModel } from './game/game.model';
import { UserModel } from './user/user.model';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  rooms$ = new BehaviorSubject<GameModel[]>([]);
  gameService: GameService;

  constructor() { }

  setupSocketConnection() {
    // sets up connection
    this.socket = io("http://karasca.com/");

    // listening to events
    this.socket.on('roomList', (data: GameModel[]) => {
      this.rooms$.next(data)
      console.log('roomlist: ', data);
    });

    // nav to joined room
    this.socket.on('navToGameView', (data: GameModel) => {
      this.gameService.view = GameView.Game;
      console.log("navToGameView: ", data);
      this.gameService.setGame(data);
    });

    // game is full
    this.socket.on('gamefull', () => {
      console.log("game full.");
    });

    this.socket.on('userInfo', (user: UserModel) => {
      this.gameService.setUser(user)
    });

    // player Joined
    this.socket.on('updatePlayers', (data:GameModel) => {
      console.log("Player Update: ", data);
      this.gameService.game.moderator = data.moderator;
      this.gameService.game.player1 = data.player1;
      this.gameService.game.player2 = data.player2;
    });

    this.socket.on('gameUpdate', (data:GameModel) => {
      console.log('gameUpdate ', data);
      this.gameService.setGame(data);
    });

    this.socket.on('p1Correct', () => {
      console.log('p1 correct');
    });

    this.socket.on('p2Correct', () => {
      console.log('p2 correct');
    });


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
  }

  getRooms():Observable<GameModel[]>{
    return this.rooms$;
  }

  setGameService(gameService: GameService){
    this.gameService = gameService;
  }

  getGameService(){
    return this.gameService;
  }

  getSocketId(){
    return this.socket.id;
  }

  sendQuestion(values: any){
    this.socket.emit('question', values);
  }

  sendAnswer(values: any){
    this.socket.emit('answer', values)
  }

  startGame(gameId: string){
    this.socket.emit('startGame', gameId);
  }

  addPointP1(points:number){
    this.socket.emit('addPointP1', points);
  }

  addPointP2(points:number){
    this.socket.emit('addPointP2', points);
  }

  nextTurn(){
    this.socket.emit('nextTurn');
  }

  finishTurn(){
    this.socket.emit('finishTurn');
  }
}
