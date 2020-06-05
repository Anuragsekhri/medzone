import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddoctorcategoryComponent } from './adddoctorcategory.component';

describe('AdddoctorcategoryComponent', () => {
  let component: AdddoctorcategoryComponent;
  let fixture: ComponentFixture<AdddoctorcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddoctorcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddoctorcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
