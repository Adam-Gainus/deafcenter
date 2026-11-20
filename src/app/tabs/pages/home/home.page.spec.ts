import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { CenterEvent } from '../../../models/center-event';
import { EventService } from '../../../services/events.service';

import { HomePage } from './home.page';

function makeEvent(id: string, title: string, status: CenterEvent['status']): CenterEvent {
  return {
    id,
    title,
    category: 'workshop',
    start: new Date('2026-11-21T18:00:00'),
    end: new Date('2026-11-21T20:00:00'),
    place: 'Main hall',
    details: 'Test details',
    status,
  };
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an empty message when there are no events this week', () => {
    const page: HTMLElement = fixture.nativeElement;

    expect(page.textContent).toContain('No events this week.');
  });

  it("shows this week's events and marks cancelled ones", () => {
    const eventService = TestBed.inject(EventService);
    vi.spyOn(eventService, 'getThisWeek').mockReturnValue([
      makeEvent('1', 'ASL Workshop', 'scheduled'),
      makeEvent('2', 'Basketball Night', 'cancelled'),
    ]);

    component.ionViewWillEnter();
    fixture.detectChanges();

    const page: HTMLElement = fixture.nativeElement;
    expect(page.textContent).toContain('ASL Workshop');
    expect(page.textContent).toContain('Basketball Night');
    expect(page.textContent).toContain('Sat, Nov 21');
    expect(page.querySelectorAll('ion-badge').length).toBe(1);
    expect(page.textContent).not.toContain('No events this week.');
  });
});
