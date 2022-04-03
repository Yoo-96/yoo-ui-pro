export interface listResultType<T> {
  result: {
    data: T[];
    total: number;
    currentPage: number;
    pageSize: number;
  };
  success: true;
}
