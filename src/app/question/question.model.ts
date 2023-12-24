import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.model.html',
  styleUrl: './question.model.scss'
})
export class QuestionModel {
  question: string;
  answer: string;
}
