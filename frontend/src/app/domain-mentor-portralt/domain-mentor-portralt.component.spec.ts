import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMentorPortraltComponent } from './domain-mentor-portralt.component';

describe('DomainMentorPortraltComponent', () => {
  let component: DomainMentorPortraltComponent;
  let fixture: ComponentFixture<DomainMentorPortraltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainMentorPortraltComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainMentorPortraltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
