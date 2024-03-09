export interface TableContent {
  tableName: string;
  rows: any[];
}

export interface Column {
  id: number;
  name: string;
}

export interface Filter {
  columnName: String;
  firstCondition?: String;
  firstConditionValue?: String | number;
  secondCondition?: String;
  secondConditionValue?: String;
}
