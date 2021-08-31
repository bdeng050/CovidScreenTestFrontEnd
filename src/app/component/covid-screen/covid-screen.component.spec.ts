import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidScreenComponent } from './covid-screen.component';

describe('CovidScreenComponent', () => {
  let component: CovidScreenComponent;
  let fixture: ComponentFixture<CovidScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
