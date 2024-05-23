import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMentorPortalTableComponent } from './domain-mentor-portal-table.component';

describe('DomainMentorPortalTableComponent', () => {
  let component: DomainMentorPortalTableComponent;
  let fixture: ComponentFixture<DomainMentorPortalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainMentorPortalTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainMentorPortalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
