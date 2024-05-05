import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMentorPortralComponent } from './course-mentor-portral.component';

describe('CourseMentorPortralComponent', () => {
  let component: CourseMentorPortralComponent;
  let fixture: ComponentFixture<CourseMentorPortralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMentorPortralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseMentorPortralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
