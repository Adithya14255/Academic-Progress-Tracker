import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMentorPortalComponent } from './course-mentor-portal-table.component';

describe('CourseMentorPortalComponent', () => {
  let component: CourseMentorPortalComponent;
  let fixture: ComponentFixture<CourseMentorPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMentorPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseMentorPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
