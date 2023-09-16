import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorymanagerComponent } from './categorymanager.component';

describe('CategorymanagerComponent', () => {
  let component: CategorymanagerComponent;
  let fixture: ComponentFixture<CategorymanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorymanagerComponent]
    });
    fixture = TestBed.createComponent(CategorymanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
