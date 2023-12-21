import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerModel } from './player.model';

describe('PlayerModel', () => {
  let component: PlayerModel;
  let fixture: ComponentFixture<PlayerModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerModel]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
