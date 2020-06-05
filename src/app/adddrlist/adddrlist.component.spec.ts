import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddrlistComponent } from './adddrlist.component';

describe('AdddrlistComponent', () => {
  let component: AdddrlistComponent;
  let fixture: ComponentFixture<AdddrlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddrlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
