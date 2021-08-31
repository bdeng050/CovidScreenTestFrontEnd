import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DontComeToWorkComponent } from './dont-come-to-work.component';

describe('DontComeToWorkComponent', () => {
  let component: DontComeToWorkComponent;
  let fixture: ComponentFixture<DontComeToWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DontComeToWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DontComeToWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
