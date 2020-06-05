import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcitymodalComponent } from './addcitymodal.component';

describe('AddcitymodalComponent', () => {
  let component: AddcitymodalComponent;
  let fixture: ComponentFixture<AddcitymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcitymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcitymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
