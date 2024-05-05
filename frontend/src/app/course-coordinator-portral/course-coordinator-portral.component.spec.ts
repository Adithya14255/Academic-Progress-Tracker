import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCoordinatorPortralComponent } from './course-coordinator-portral.component';

describe('CourseCoordinatorPortralComponent', () => {
  let component: CourseCoordinatorPortralComponent;
  let fixture: ComponentFixture<CourseCoordinatorPortralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCoordinatorPortralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCoordinatorPortralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
