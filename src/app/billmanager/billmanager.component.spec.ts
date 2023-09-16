import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillmanagerComponent } from './billmanager.component';

describe('BillmanagerComponent', () => {
  let component: BillmanagerComponent;
  let fixture: ComponentFixture<BillmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillmanagerComponent]
    });
    fixture = TestBed.createComponent(BillmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
