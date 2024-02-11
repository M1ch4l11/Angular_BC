import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemType } from 'src/app/models/item-type';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Output()
  loadComponentEvent: EventEmitter<{ type: string; item?: any }> =
    new EventEmitter();
  @Input() type!: ItemType;
  // todo create generative type Product, Employee
  @Input() item!: any;

  loadEvent(): void {
    this.loadComponentEvent.emit({ type: this.type, item: this.item });
  }

  checkType(): boolean {
    return this.type === 'Product' || false;
  }
}
