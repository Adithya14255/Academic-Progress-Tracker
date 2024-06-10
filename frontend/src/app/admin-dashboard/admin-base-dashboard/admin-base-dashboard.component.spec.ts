import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBaseDashboardComponent } from './admin-base-dashboard.component';

describe('AdminBaseDashboardComponent', () => {
  let component: AdminBaseDashboardComponent;
  let fixture: ComponentFixture<AdminBaseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBaseDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
