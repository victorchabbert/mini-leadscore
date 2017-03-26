export const defaultOperator = {
  AND: 'AND',
  OR: 'OR'
};
export type DefaultOperator = (typeof defaultOperator)[keyof typeof defaultOperator];

export const operator = {
  EQUAL: 'EQUAL',
  NOT_EQUAL: 'NOT_EQUAL',
  GREATER_THAN: 'GREATER_THAN',
  LOWER_THAN: 'LOWER_THAN',
  IN_BETWEEN: 'IN_BETWEEN',
  AT_LEAST_ONE: 'AT_LEAST_ONE',
  AT_MOST_ONE: 'AT_MOST_ONE',
  NULL: 'NULL',
  NOT_NULL: 'NOT_NULL'
};
export type Operator = (typeof operator)[keyof typeof operator];

export interface Filter {
  field: string;
  op: Operator;
  value: any;
}

export interface ContactFilters {
  defaultOperator: DefaultOperator;
  filters: Filter[];
}
