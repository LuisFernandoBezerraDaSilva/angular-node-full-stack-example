// filepath: /e:/projects/angular-node-full-stack-example/front-end/src/app/pages/list-page/list-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ValueService } from '../../services/value.service';
import { AgridComponent } from '../../components/agrid/agrid.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared.module';
import { StorageService } from '../../services/storage.service';
import { getMonthName } from '../../helpers/date.helper';
import { Router } from '@angular/router';

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

  constructor(private valueService: ValueService, private router: Router) {}

  ngOnInit(): void {
    this.valueService.getValues().subscribe({
      next: (data: any) => {
        const transformedData = this.transformData(data);

        this.columnDefs = this.createColumnDefs(data);

        this.rowData = transformedData;
        this.isLoading = false;
      },
      error: (error: any) => {
        if (error.status === 403) {
          this.router.navigate(['']);
        } else {
          console.error(error);
        }
        this.isLoading = false;
      }
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
      ...months.map(month => ({ field: month, headerName: getMonthName(month) }))
    ];

    return columnDefs;
  }
}