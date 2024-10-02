import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaksCreateEditComponent } from './taks-create-edit.component';

describe('TaksCreateEditComponent', () => {
  let component: TaksCreateEditComponent;
  let fixture: ComponentFixture<TaksCreateEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaksCreateEditComponent]
    });
    fixture = TestBed.createComponent(TaksCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
