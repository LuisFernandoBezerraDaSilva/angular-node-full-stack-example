import { Component, OnInit, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-agrid',
  imports: [AgGridModule],
  templateUrl: './agrid.component.html',
  styleUrls: ['./agrid.component.css']
})
export class AgridComponent implements OnInit {
  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any[] = [];

  constructor(private baseService: BaseService<any>) {}

  ngOnInit(): void {
    if (!this.rowData.length) {
      this.baseService.getAll('your-endpoint').subscribe(data => {
        this.rowData = data;
      });
    }
  }
}