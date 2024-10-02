import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkillComponent } from './create-skill.component';

describe('CreateSkillComponent', () => {
  let component: CreateSkillComponent;
  let fixture: ComponentFixture<CreateSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSkillComponent]
    });
    fixture = TestBed.createComponent(CreateSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
