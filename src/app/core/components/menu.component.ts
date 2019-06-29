import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-menu',
  template: `
    <nav mat-tab-nav-bar aria-label="weather navigation links">
      <a
        mat-tab-link
        *ngFor="let routeLink of routeLinks; let i = index"
        [routerLink]="routeLink.link"
        [active]="activeLinkIndex == i"
        (click)="activeLinkIndex = i"
      >
        {{ routeLink.label }}
      </a>
    </nav>
  `,
  styles: [
    `
      :host {
        margin-top: 30px;
      }
    `
  ]
})
export class MenuComponent {
  
  routeLinks: any[];
  activeLinkIndex = 0;
  constructor(private router: Router, private shared:BooksService) {
    this.routeLinks = [
      { label: 'Events listing', link: '/catalog/list' },
      { label: 'Event booking', link: '/cart/order' }
    ];
  }
  getFiltered(e){
    this.shared.getBook(e.target.value);
  }
}
