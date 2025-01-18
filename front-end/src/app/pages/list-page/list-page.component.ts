import { Component, OnInit } from '@angular/core';
import { AgridComponent } from '../../components/agrid/agrid.component';
import { ValueService } from '../../services/value.service';
import { ColDef } from 'ag-grid-community';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from '../../services/storage.service';
import { SharedModule } from '../../shared.module';

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
  values: any[] = [];
  columnDefs: ColDef[] = [];
  isLoading: boolean = true;

  constructor(private valueService: ValueService) {}

  ngOnInit(): void {
    this.valueService.getValues().subscribe({
      next: (data: any) => {
        console.log(data);
        this.values = data;
        if (data.length > 0) {
          this.columnDefs = Object.keys(data[0]).map(key => ({ field: key }));
          console.log(this.columnDefs);
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching values', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Values fetching completed');
      }
    });
  }
}