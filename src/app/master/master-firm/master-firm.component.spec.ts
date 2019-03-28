import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFirmComponent } from './master-firm.component';

describe('MasterFirmComponent', () => {
  let component: MasterFirmComponent;
  let fixture: ComponentFixture<MasterFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
