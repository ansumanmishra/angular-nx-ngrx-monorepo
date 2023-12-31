import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '@angular-nx-ngrx-monorepo/category';
import { LoginService } from '@angular-nx-ngrx-monorepo/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterModule,
    NgIf,
    NgFor,
    TitleCasePipe,
    MatMenuModule,
  ]
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isLoggedIn = inject(LoginService).isLoggedIn;

  categoryService = inject(CategoryService);
  categories$ = this.categoryService.getCategories();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
