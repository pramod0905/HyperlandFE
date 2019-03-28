import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPlcComponent } from './master-plc.component';

describe('MasterPlcComponent', () => {
  let component: MasterPlcComponent;
  let fixture: ComponentFixture<MasterPlcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPlcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
