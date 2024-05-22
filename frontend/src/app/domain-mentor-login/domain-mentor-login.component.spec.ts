import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMentorLoginComponent } from './domain-mentor-login.component';

describe('DomainMentorLoginComponent', () => {
  let component: DomainMentorLoginComponent;
  let fixture: ComponentFixture<DomainMentorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainMentorLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainMentorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
