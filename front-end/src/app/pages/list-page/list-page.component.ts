import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ValueService } from '../../services/value.service';
import { AgridComponent } from '../../components/agrid/agrid.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared.module';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    AgridComponent,
    MatCardModule,
    SharedModule
  ],
  providers: [
    ValueService,
    StorageService
  ],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  isLoading = true;

  constructor(private valueService: ValueService) {}

  ngOnInit(): void {
    this.valueService.getValues().subscribe(data => {
      // Transform data
      const transformedData = this.transformData(data);

      // Define columns
      this.columnDefs = this.createColumnDefs(data);

      this.rowData = transformedData;
      this.isLoading = false;
    });
  }

  transformData(data: any[]): any[] {
    const userMap: { [key: number]: any } = {};

    data.forEach(item => {
      if (!userMap[item.userId]) {
        userMap[item.userId] = { userId: item.userId };
      }
      userMap[item.userId][item.month] = item.value;
    });

    return Object.values(userMap);
  }

  createColumnDefs(data: any[]): ColDef[] {
    const months = Array.from(new Set(data.map(item => item.month)));

    const columnDefs: ColDef[] = [
      { field: 'userId', headerName: 'User ID' },
      ...months.map(month => ({ field: month, headerName: this.getMonthName(month) }))
    ];

    return columnDefs;
  }

  getMonthName(month: string): string {
    const monthNames: { [key: string]: string } = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    };

    if (month.includes('/')) {
      const [monthPart, yearPart] = month.split('/');
      return monthNames[monthPart as keyof typeof monthNames];
    }

    return month;
  }
}