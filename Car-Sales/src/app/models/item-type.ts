export interface FormEvent {
  type: ItemType;
  item?: any;
}

export type ItemType = 'products' | 'employees';
