export interface TableColumnContent {
  tableName: string;
  rows: Row[];
}

export interface Column {
  id: number;
  name: string;
}

interface Row {
  id: number;
  values: any[];
}
