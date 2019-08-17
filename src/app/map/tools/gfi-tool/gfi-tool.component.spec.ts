import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GfiToolComponent } from './gfi-tool.component';

describe('GfiToolComponent', () => {
  let component: GfiToolComponent;
  let fixture: ComponentFixture<GfiToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GfiToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GfiToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
