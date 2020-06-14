import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsponsorComponent } from './addsponsor.component';

describe('AddsponsorComponent', () => {
  let component: AddsponsorComponent;
  let fixture: ComponentFixture<AddsponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
