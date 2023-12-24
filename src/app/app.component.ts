import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from './socketio.service';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';
import { GameModel } from './game/game.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  roomsList$ = new BehaviorSubject<GameModel[]>([]);

  constructor(
    private socketService: SocketioService, 
    private gameService: GameService, 
    private formBuilder: FormBuilder) {

  }

  questionForm = this.formBuilder.group({
    question: '',
    answer: ''
  });

  answerForm = this.formBuilder.group({
    answer: ''
  });

  createRoom(event:any){
    console.log(event);
    this.socketService.createRoom();
  }

  joinRoom(id:string){
    this.socketService.joinRoom(id);
  }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();

    this.socketService.setGameService(this.gameService);

    this.socketService.getRooms().subscribe(
      (value) => { 
        this.roomsList$.next(value);
      }
    )
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  getGameService(){
    return this.gameService;
  }

  printStatus(){
    switch (this.gameService.game.status) {
      case 0:
        return "Waiting for Players";
      case 1:
        return "Waiting for Question";
      case 2:
        return "Waiting for Answers";
      case 3:
        return "Waiting for ";
      default:
        return "No Status";
    }
  }

  isMod(){
    return this.gameService.game.moderator?.id == this.gameService.user.id;
  }

  startGame(){
    this.socketService.startGame(this.gameService.game.roomId);
  }

  onSubmitQuestionForm(): void{
    console.log(this.questionForm.value);
    this.socketService.sendQuestion(this.questionForm.value);
    this.questionForm.reset();
  }

  onSubmitAnswerForm(): void{
    console.log(this.answerForm.value);
    this.socketService.sendAnswer(this.answerForm.value);
    this.answerForm.reset();
  }

}
