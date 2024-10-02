import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSkillsComponent } from './list-skills.component';

describe('ListSkillsComponent', () => {
  let component: ListSkillsComponent;
  let fixture: ComponentFixture<ListSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSkillsComponent]
    });
    fixture = TestBed.createComponent(ListSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
