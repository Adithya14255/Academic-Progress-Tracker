import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMentorPortalBaseComponent } from './domain-mentor-portal-base.component';

describe('DomainMentorPortalComponent', () => {
  let component: DomainMentorPortalBaseComponent;
  let fixture: ComponentFixture<DomainMentorPortalBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainMentorPortalBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainMentorPortalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
