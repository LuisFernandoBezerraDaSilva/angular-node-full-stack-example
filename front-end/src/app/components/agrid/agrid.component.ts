import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

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

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // Remova a adição da classe do tema
  }
}