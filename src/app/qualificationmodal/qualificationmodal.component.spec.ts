import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationmodalComponent } from './qualificationmodal.component';

describe('QualificationmodalComponent', () => {
  let component: QualificationmodalComponent;
  let fixture: ComponentFixture<QualificationmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
