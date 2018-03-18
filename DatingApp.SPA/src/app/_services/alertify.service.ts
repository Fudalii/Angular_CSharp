import { Injectable } from '@angular/core';
declare let  alertify: any;

@Injectable()
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCalback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCalback();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.wafning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

}
