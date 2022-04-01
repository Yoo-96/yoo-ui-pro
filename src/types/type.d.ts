export interface listResultType {
  result: {
    data: { [key: string]: any };
    total: number;
    currentPage: number;
    pageSize: number;
  };
  success: true;
}
