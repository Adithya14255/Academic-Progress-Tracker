import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMentorPortalComponent } from './domain-mentor-portal.component';

describe('DomainMentorPortalComponent', () => {
  let component: DomainMentorPortalComponent;
  let fixture: ComponentFixture<DomainMentorPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainMentorPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainMentorPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
