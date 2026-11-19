import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { InterpretersPage } from './interpreters.page';

describe('InterpretersPage', () => {
  let component: InterpretersPage;
  let fixture: ComponentFixture<InterpretersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
