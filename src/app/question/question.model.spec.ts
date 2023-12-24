import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionModel } from './question.model';

describe('QuestionModel', () => {
  let component: QuestionModel;
  let fixture: ComponentFixture<QuestionModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionModel]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
