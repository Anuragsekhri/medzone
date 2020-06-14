import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfoModalComponent } from './doctor-info-modal.component';

describe('DoctorInfoModalComponent', () => {
  let component: DoctorInfoModalComponent;
  let fixture: ComponentFixture<DoctorInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
