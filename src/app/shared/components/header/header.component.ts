import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faChevronLeft,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { takeUntil, tap } from 'rxjs/operators';
import { DestroyableComponent } from '../../abstracts';

@Component({
  selector: 'hd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends DestroyableComponent implements OnInit {
  translatePath = 'header.';
  currentRoute!: string;
  backIcon: IconDefinition = faChevronLeft;

  constructor(private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        tap((route) => {
          if (route instanceof NavigationEnd) {
            const urlTree = this.router.parseUrl(route.urlAfterRedirects);
            const urlWithoutParams = urlTree.root.children[
              'primary'
            ]?.segments.map((it) => it.path);
            this.currentRoute = urlWithoutParams[urlWithoutParams?.length - 1];
          }
        })
      )
      .subscribe();
  }

  backHome(): void {
    this.router.navigate(['/home']);
  }
}
