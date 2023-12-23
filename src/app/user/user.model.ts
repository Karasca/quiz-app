import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.model.html',
  styleUrl: './user.model.scss'
})
export class UserModel {
  id: string = "0";
  name: string = "NONAME";
  role: string = "none";
}
