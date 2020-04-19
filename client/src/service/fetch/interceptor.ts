export interface DefaultConfig {
  baseURL: string;
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  withCredentials: boolean;
  headers: { [header: string]: string | string[] };
  jsonp: boolean;
  // interceptors?: HttpInterceptor[];
}
