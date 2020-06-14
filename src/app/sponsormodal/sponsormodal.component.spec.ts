import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsormodalComponent } from './sponsormodal.component';

describe('SponsormodalComponent', () => {
  let component: SponsormodalComponent;
  let fixture: ComponentFixture<SponsormodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsormodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsormodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
