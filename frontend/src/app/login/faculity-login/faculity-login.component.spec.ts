import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculityLoginComponent } from './faculity-login.component';

describe('FaculityLoginComponent', () => {
  let component: FaculityLoginComponent;
  let fixture: ComponentFixture<FaculityLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaculityLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaculityLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
