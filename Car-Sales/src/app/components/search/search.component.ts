import { Component, EventEmitter, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DataService } from 'src/app/stores/data.service';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { GlobalService } from 'src/app/stores/global.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor() {} // private dataService: DataService // private globalStore: GlobalService<> add type

  onInputChange(event: Event): void {
    // dataService.get((event.target as HTMLInputElement).value);
    // this.globalStore.createSignal(
    //   toSignal(this.dataService.searchData<>('ddsdf', 'asd'))as WritableSignal<> add type
    // );
  }
}
