import { Component } from '@angular/core';
import { PlayerModel } from '../player/player.model';

@Component({
  selector: 'app-moderator',
  standalone: true,
  imports: [],
  templateUrl: './moderator.model.html',
  styleUrl: './moderator.model.scss'
})
export class ModeratorModel {
  player!: PlayerModel;
}
