import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableDashboardComponent } from './admin-table-dashboard.component';

describe('AdminTableDashboardComponent', () => {
  let component: AdminTableDashboardComponent;
  let fixture: ComponentFixture<AdminTableDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTableDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
