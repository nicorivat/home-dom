import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpotifyPageComponent } from './spotify.page';

describe('SpotifyPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FlexLayoutModule],
      declarations: [SpotifyPageComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SpotifyPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
