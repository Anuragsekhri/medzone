import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsessionmodalComponent } from './showsessionmodal.component';

describe('ShowsessionmodalComponent', () => {
  let component: ShowsessionmodalComponent;
  let fixture: ComponentFixture<ShowsessionmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsessionmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsessionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
