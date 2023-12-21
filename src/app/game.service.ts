import { Injectable } from '@angular/core';
import { ModeratorModel } from './models/moderator/moderator.model';
import { GameModel, GameStatus } from './game/game.model';
import { PlayerModel } from './models/player/player.model';
import { RoomModel } from './models/room/room.model';

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

  // constructor(moderator: ModeratorModel) { 
  //   this.game.moderator = moderator.player;
  //   this.game.player1Score = 0;
  //   this.game.player2Score = 0;
  //   this.game.timer = 60;
  //   this.game.status = GameStatus.WaitingForPlayers;
  //   this.game.questions = [];
  // }
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
    this.game.questions = data.questions;
    this.game.status = data.status;
    this.game.timer = data.timer;
    this.game.title = data.title;
  }
}
