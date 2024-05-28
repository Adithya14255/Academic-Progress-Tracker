import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMentorComponent } from './course-mentor-portal.component';

describe('CourseMentorComponent', () => {
  let component: CourseMentorComponent;
  let fixture: ComponentFixture<CourseMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
