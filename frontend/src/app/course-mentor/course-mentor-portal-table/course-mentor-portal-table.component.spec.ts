import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMentorPortalTableComponent } from './course-mentor-portal-table.component';

describe('CourseMentorPortalComponent', () => {
  let component: CourseMentorPortalTableComponent;
  let fixture: ComponentFixture<CourseMentorPortalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMentorPortalTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseMentorPortalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
