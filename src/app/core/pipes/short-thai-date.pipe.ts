import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'shortThaiDate'
})
export class ShortThaiDatePipe implements PipeTransform {

  transform(value: any): string {
    const dt = DateTime.fromISO(value, {
      zone: "Asia/Bangkok",
      locale: 'th'
    })
    if (dt.isValid) {
      return dt.toLocaleString(DateTime.DATE_MED);
    }
    return '-';
  }

}
