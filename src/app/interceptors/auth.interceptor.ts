import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const credentials = auth.getCredentials();
  const activeRole = auth.getActiveRole();

  if (req.url.includes('/api/auth/')) {
    return next(req);
  }

  if (credentials && activeRole) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials}`,
        'X-Active-Role': activeRole,
      },
    });
    return next(authReq);
  }

  return next(req);
};
