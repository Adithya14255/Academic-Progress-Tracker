import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMentorComponent } from './domain-mentor.component';

describe('DomainMentorComponent', () => {
  let component: DomainMentorComponent;
  let fixture: ComponentFixture<DomainMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
