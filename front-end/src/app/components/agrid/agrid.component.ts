import { Component, OnInit, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-agrid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './agrid.component.html',
  styleUrls: ['./agrid.component.css']
})
export class AgridComponent implements OnInit {
  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Any initialization logic can go here
  }
}