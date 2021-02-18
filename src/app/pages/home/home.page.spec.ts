import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home.page';

describe('HomePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        FlexLayoutModule,
        HomeRoutingModule,
      ],
      declarations: [HomePageComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
