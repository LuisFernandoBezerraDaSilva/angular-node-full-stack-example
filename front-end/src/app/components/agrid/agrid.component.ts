import { Component, OnInit, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

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
    // Register all community features

    // Mark all grids as using legacy themes
    // provideGlobalGridOptions({ theme: "legacy" });

    // Any initialization logic can go here
  }
}