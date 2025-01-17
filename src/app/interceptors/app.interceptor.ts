import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { IMGUR_CONTEXT } from '../shared/imgur.const';
import { isDevMode } from '@angular/core';

const SERVER_URL_LOCAL = 'http://localhost:3000'
const SERVER_URL_PROD = 'http://localhost:3000'
const SERVER_URL = isDevMode() ? SERVER_URL_LOCAL : SERVER_URL_PROD;

export function appInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const context = req.context;
    const config = context.get(IMGUR_CONTEXT)
    let baseUrl = SERVER_URL
    let setHeaders = {}
    if(config) {
      baseUrl = config.apiUrl
      setHeaders = {
        'Content-Type': 'application/json',
        ...config.accessToken
      }
    }
    const cloned = req.clone({
      url: baseUrl + req.url,
      setHeaders,
    });

    return next(cloned);
  };
}
