import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmanagerComponent } from './bookmanager.component';

describe('BookmanagerComponent', () => {
  let component: BookmanagerComponent;
  let fixture: ComponentFixture<BookmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmanagerComponent]
    });
    fixture = TestBed.createComponent(BookmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
