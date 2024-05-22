import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyInchargeComponent } from './faculty-incharge.component';

describe('FacultyInchargeComponent', () => {
  let component: FacultyInchargeComponent;
  let fixture: ComponentFixture<FacultyInchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyInchargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
