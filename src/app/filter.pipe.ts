import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // Khai báo một biến để lưu trữ độ dài của dữ liệu đã lọc
  filteredLength: number = 0;

  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    
    // Lọc dữ liệu và cập nhật độ dài của dữ liệu đã lọc
    const filteredData = value.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });

    this.filteredLength = filteredData.length;

    return filteredData;
  }
}
