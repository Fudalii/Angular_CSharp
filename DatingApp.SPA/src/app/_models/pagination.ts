
export interface Pagination {
  CurentPage: number;
  ItemsPerPage: number;
  TotalItems: number;
  TotalPages: number;
}

export class PaginatedResult<T> {

    result: T;
    pagination: Pagination;

  }

