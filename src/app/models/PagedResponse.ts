export default class PagedResponse<T> {
  Data!: Array<T>;
  Succeeded!: boolean;
  Errors!: Array<string>;
  PageNumber!: number;
  PageSize!: number;
  TotalPages!: number;
  TotalRecords!: number;
}
