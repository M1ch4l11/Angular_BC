export interface FormEvent {
  type: ItemType;
  item?: any;
}

export type ItemType = 'Product' | 'Employee';
