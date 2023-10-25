import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser, userActions, userfeature } from '@angular-nx-ngrx-monorepo/common/store';

@Component({
  selector: 'angular-nx-ngrx-monorepo-user',
  standalone: true,
  imports: [CommonModule, JsonPipe, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  #store = inject(Store);
  profileData$ = this.#store.select(selectUser);

  ngOnInit(): void {
      this.#store.dispatch(userActions.loadUserProfile());
      this.profileData$.subscribe(console.log);
      console.log(userfeature);
      
  }
}
