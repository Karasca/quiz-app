import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from './socketio.service';
import { BehaviorSubject } from 'rxjs';
import { RoomModel } from './models/room/room.model';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  roomsList$ = new BehaviorSubject<RoomModel[]>([]);

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
}
