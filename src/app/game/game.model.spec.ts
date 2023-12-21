import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModel } from './game.model';

describe('GameModel', () => {
  let component: GameModel;
  let fixture: ComponentFixture<GameModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameModel]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
