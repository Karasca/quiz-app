import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomModel } from './room.model';

describe('RoomModel', () => {
  let component: RoomModel;
  let fixture: ComponentFixture<RoomModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomModel]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
