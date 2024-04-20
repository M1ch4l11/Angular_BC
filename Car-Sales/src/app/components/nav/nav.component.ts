import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlobalService } from 'src/app/store/global-store.service';

@Component({
  selector: 'nav-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  login = computed(() => this.dataStore.userLogin());
  admin = computed(() => this.dataStore.adminLogin());
  constructor(private dataStore: GlobalService<any>) {}
}
