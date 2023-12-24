import { Component } from '@angular/core';
import { PlayerModel } from '../models/player/player.model';
import { QuestionModel } from '../question/question.model';

/*
**  Game Flow
*   1. Create Room (->Waiting For Players)
*   2. Press Start (->Waiting for Question Input)
*   3. Mod. inputs question & Answer (-> Waiting for answers)
*   4. Player1 & Player 2 input answer (-> Mod checks answers)
*   5. Mod submits results/display results (-> Waiting for Question Input)
*   6. GOTO 3. 
*/

export enum GameStatus {
  WaitingForPlayers,
  WaitingForQuestion,
  WaitingForAnswer,
  CheckingAnswers
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.model.html',
  styleUrl: './game.model.scss'
})
export class GameModel {
  title: string = "";
  question : QuestionModel;
  timer: number = 60;
  player1: PlayerModel;
  player1Score: number = 0;
  player2: PlayerModel;
  player2Score: number = 0;
  moderator: PlayerModel;
  status: GameStatus = GameStatus.WaitingForPlayers;
  roomId: string;
  p1Answer: string;
  p2Answer: string;
}


