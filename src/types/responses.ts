export interface IResponse<T = unknown> {
  action?: string;
  items?: T;
  message?: string;
  error?: string;
}
