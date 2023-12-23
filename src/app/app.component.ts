import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from './socketio.service';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';
import { GameModel } from './game/game.model';
import { UserModel } from './user/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  roomsList$ = new BehaviorSubject<GameModel[]>([]);

  constructor(private socketService: SocketioService, private gameService: GameService) {

  }

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
    return this.gameService.user.role == "mod"
  }

  startGame(){
    this.socketService.startGame(this.gameService.game.roomId);
  }
}
