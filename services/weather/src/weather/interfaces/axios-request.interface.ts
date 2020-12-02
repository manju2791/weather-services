export class IAxiosRequest {
  method: string;
  baseURL: string;
  path?: string;
  payload?: Record<string, any>;
  headers?: Record<string, any>;
  params?: Record<string, any>;
}
