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

export interface SearchFilter {
  columnNameFirst: String;
  columnNameSecond: String;
  firstCondition: String;
  firstConditionValue: String | number;
}

export interface Pagination {
  currentPage: number;
  totalPage: number;
  rows: number;
}

export interface PaginationRequest {
  searchFilter: SearchFilter;
  paginationFilter: Pagination;
}
