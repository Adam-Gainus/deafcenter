import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../../services/auth.service';

import { StaffPage } from './staff.page';

describe('StaffPage', () => {
  let component: StaffPage;
  let fixture: ComponentFixture<StaffPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the login form when nobody is logged in', () => {
    const page: HTMLElement = fixture.nativeElement;

    expect(page.querySelector('form')).toBeTruthy();
    expect(page.textContent).toContain('Log In');
  });

  it('shows an error message when login fails', async () => {
    const authService = TestBed.inject(AuthService);
    vi.spyOn(authService, 'logIn').mockRejectedValue(new Error('wrong password'));

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Wrong email or password');
  });
});
