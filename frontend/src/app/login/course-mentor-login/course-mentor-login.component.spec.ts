import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMentorLoginComponent } from './course-mentor-login.component';

describe('CourseMentorLoginComponent', () => {
  let component: CourseMentorLoginComponent;
  let fixture: ComponentFixture<CourseMentorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMentorLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseMentorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
