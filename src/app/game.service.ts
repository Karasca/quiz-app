import { Injectable } from '@angular/core';
import { GameModel, GameStatus } from './game/game.model';
import { PlayerModel } from './models/player/player.model';
import { UserModel } from './user/user.model';

export enum GameView{
  Lobby,
  Game
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  view = GameView.Lobby;
  game = new GameModel;
  user = new UserModel;
  currentAnswer = "";

  constructor(){

  }

  createGame(socketId: string) {
    this.game.moderator.id = socketId;
  }

  joinGame(socketId: string) {
    if(this.game.player1 == undefined){
      this.game.player1 = new PlayerModel;
      this.game.player1.id = socketId;
      this.view = GameView.Game;
    }
    else if(this.game.player2 == undefined){
      this.game.player2 = new PlayerModel;
      this.game.player2.id = socketId;
      this.view = GameView.Game;
    }
    else{
      //TODO: Handle Game full
    }
  }

  setGame(data: GameModel) {
    this.game.moderator = data.moderator;
    this.game.player1 = data.player1;
    this.game.player1Score = data.player1Score;
    this.game.player2 = data.player2;
    this.game.player2Score = data.player2Score;
    this.game.question = data.question;
    this.game.status = data.status;
    this.game.timer = data.timer;
    this.game.title = data.title;
    this.game.roomId = data.roomId;
    this.game.p1Answer = data.p1Answer;
    this.game.p2Answer = data.p2Answer;
  }

  setUser(user: UserModel){
    this.user.id = user.id;
    this.user.name = user.name;
    this.user.role = user.role;
  }

  setAnswer(answer:string){
    this.currentAnswer = answer;
  }
}
