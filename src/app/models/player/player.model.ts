import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.model.html',
  styleUrl: './player.model.scss'
})
export class PlayerModel {
  id!: string;
  name!: string;
}
