import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from './socketio.service';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';
import { GameModel, GameStatus } from './game/game.model';
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
  answer = "";

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
        return "Checking Answers";
      case 4:
        return "Results";
      default:
        return "No Status";
    }
  }

  isMod(){
    return this.gameService.game.moderator?.id == this.gameService.user.id;
  }

  isPlayer1(){
    return this.gameService.game.player1?.id == this.gameService.user.id;
  }

  isPlayer2(){
    return this.gameService.game.player2?.id == this.gameService.user.id;
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
    this.gameService.setAnswer(this.answerForm.value.answer as string);
    this.answerForm.reset();
  }

  addPointP1(points: number){
    this.socketService.addPointP1(points);
  }

  addPointP2(points: number){
    this.socketService.addPointP2(points);
  }

  nextTurn(){
    this.socketService.nextTurn();
  }

  finishTurn(){
    this.socketService.finishTurn();
  }

  getPlayerCount(room: GameModel){
    let count = 0;
    if(room.player1){
      count += 1;
    }
    if(room.player2){
      count += 1;
    }
    return count;
  }

  currentAnswer(){
    if(this.gameService.currentAnswer.length > 0){
      return this.gameService.currentAnswer;
    }else{
      return 'No Answer';
    }
  }
  
  answerButtonText(){
    if(this.gameService.currentAnswer.length > 0){
      return 'Change Answer';
    }else{
      return 'Submit Answer';
    }
  }

  getP1Image(){
    let status = this.gameService.game.status

    if(status === GameStatus.CheckingAnswers){
      return 'assets/images/quizshow_mokou1_idle2.png';
    }else if(status === GameStatus.P1CorrectResult || status === GameStatus.BothCorrectResult){
      return 'assets/images/quizshow_mokou2_correct.png';
    }else if(status === GameStatus.P2CorrectResult || status === GameStatus.BothWrongResult){
      return 'assets/images/quizshow_mokou3_incorrect.png';
    }else{
      return 'assets/images/quizshow_mokou1_idle.png';
    }
  }

  getP2Image(){
    let status = this.gameService.game.status

    if(status === GameStatus.CheckingAnswers){
      return 'assets/images/quizshow_akyuu1_idle2.png';
    }else if(status === GameStatus.P2CorrectResult || status === GameStatus.BothCorrectResult){
      return 'assets/images/quizshow_akyuu2_correct.png';
    }else if(status === GameStatus.P1CorrectResult || status === GameStatus.BothWrongResult){
      return 'assets/images/quizshow_akyuu3_incorrect.png';
    }else{
      return 'assets/images/quizshow_akyuu1_idle.png';
    }
  }

  getJudgeImage(){
    let status = this.gameService.game.status

    if(status === GameStatus.WaitingForAnswer){
      return 'assets/images/quizshow_cirno1_idle.png';
    }else if(status === GameStatus.P2CorrectResult){
      return 'assets/images/quizshow_cirno3_right.png';
    }else if(status === GameStatus.BothCorrectResult || status === GameStatus.BothWrongResult){
      return 'assets/images/quizshow_cirno1_idle.png';
    }else if(status === GameStatus.P1CorrectResult){
      return 'assets/images/quizshow_cirno2_left.png';
    }else{
      return 'assets/images/quizshow_cirno1_idle.png';
    }
    
  }

  getImage(imageName: string) {
    return `https://karasca.com/images/${imageName}`;
  }

  getP1Rgb(){
    return {backgroundColor: `rgb(${this.brighten(this.gameService.game.player1.color[this.getRandomInt(6)]).toString()})`};
  }

  getP2Rgb(){
    return {backgroundColor: `rgb(${this.brighten(this.gameService.game.player2.color[this.getRandomInt(6)]).toString()})`};
  }

  getModRgb(){
    return {backgroundColor: `rgb(${this.brighten(this.gameService.game.moderator.color[this.getRandomInt(6)]).toString()})`};
  }

  averageColor(paletteArr:Array<number[]>){
    let resultArr = [0, 0, 0];

    paletteArr.forEach(rgbArr => {
      console.log('paletteArr: ', paletteArr);
      resultArr[0] += rgbArr[0];
      resultArr[1] += rgbArr[1];
      resultArr[2] += rgbArr[2];
    });

    resultArr.forEach((colorVal, index) => {
      resultArr[index] = colorVal / 8;
    });
    console.log(resultArr);
    return resultArr;
  }

  brighten(rgbArr:Array<number>){
    let rArr = new Array<number>;
    rArr[0] = Math.min(200, rgbArr[0]*1.25);
    rArr[1] = Math.min(200, rgbArr[1]*1.25);
    rArr[2] = Math.min(200, rgbArr[2]*1.25);

    return rArr;
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
}
