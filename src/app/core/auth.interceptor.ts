import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getToken();
  if (jwtToken) {
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
  }
  return next(req);
};

function getToken() {
  return localStorage.getItem("access_token")
}
