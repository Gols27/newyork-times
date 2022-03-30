import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchQuery: string, field: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchQuery) {
      return items;
    }
    return items.filter((item) => {
      if (item && item[field] && item[field].includes(searchQuery)) {
        return true;
      }
      return false;
    });
  }
}
