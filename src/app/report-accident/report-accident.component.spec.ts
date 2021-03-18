import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAccidentComponent } from './report-accident.component';

describe('ReportAccidentComponent', () => {
  let component: ReportAccidentComponent;
  let fixture: ComponentFixture<ReportAccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
