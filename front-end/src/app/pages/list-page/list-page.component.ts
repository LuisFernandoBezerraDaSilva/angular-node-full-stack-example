import { Component, OnInit } from '@angular/core';
// import { AgridComponent } from '../../components/agrid/agrid.component';
import { ValueService } from '../../services/value.service';
import { ColDef } from 'ag-grid-community';
import { getObjectKeys } from '../../helpers/object-keys.helper';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from '../../services/storage.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    // AgridComponent,
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
  values: any[] = [];
  columnDefs: ColDef[] = [];

  constructor(private valueService: ValueService) {}

  ngOnInit(): void {
    this.valueService.getValues().subscribe({
      next: (data: any) => {
        this.values = data;
        if (data.length > 0) {
          this.columnDefs = getObjectKeys(data[0]);
        }
      },
      error: (err: any) => {
        console.error('Error fetching values', err);
      },
      complete: () => {
        console.log('Values fetching completed');
      }
    });
  }
}