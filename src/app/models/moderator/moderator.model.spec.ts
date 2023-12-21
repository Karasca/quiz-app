import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorModel } from './moderator.model';

describe('ModeratorModel', () => {
  let component: ModeratorModel;
  let fixture: ComponentFixture<ModeratorModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorModel]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
