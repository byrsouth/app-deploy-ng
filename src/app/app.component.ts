import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColDef, RowGroupingDisplayType } from 'ag-grid-community';
import 'ag-grid-enterprise';
//import { Columns, DefaultColDef } from './grid_defs/deployData';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   title = 'app-deploy-ng';

   Columns: ColDef[] = [
      { field: 'project', rowGroup: true, hide: true },
      { field: 'deployEnv', rowGroup: true, hide: true },
      { field: 'tagName' },
      { field: 'branch' },
      { field: 'version' },
      { field: 'timestamp' },
   ];

   DefaultColDef: ColDef = {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
   };

   groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
   gridOptions = {
      columnDefs: this.Columns,
      defaultColDef: this.DefaultColDef,
      animateRow: true,
      autoGroupColumnDef: {
         minWidth: 200,
         headerName: 'Projects',
         cellRendererParams: {
            suppressCount: true,
            innerRenderer: (p: { value: string }) => '<b>' + p.value + '</b>',
         },
      },
   };

   rowData$?: Observable<any[]>;
   columnDefs = this.Columns;
   defaultColDef = this.DefaultColDef;
   rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'never';

   constructor(private http: HttpClient) {}

   ngOnInit(): void {
      this.rowData$ = this.http.get<any[]>(
         'https://httpappdeployment.azurewebsites.net/api/httpappdeploymentout'
      );
   }
}
