import { Component } from '@angular/core';
import { ModeratorModel } from '../moderator/moderator.model';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.model.html',
  styleUrl: './room.model.scss'
})
export class RoomModel {
  id!: string;
  moderator!: ModeratorModel;
}
