import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MasterRouterModule } from './master.router';
import { AgmCoreModule } from '@agm/core';

import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { MasterFirmComponent, DialogOverviewExampleDialog } from './master-firm/master-firm.component';
import { MatButtonModule, MatDialogModule, MatFormField, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatInputModule, MatGridListModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MasterCityComponent } from './master-city/master-city.component';
import { MasterProjectComponent, DialogOverviewEProjectDialog } from './master-project/master-project.component';
import { MasterBlockComponent, DialogOverviewBlockDialog } from './master-block/master-block.component';
import { DeleteMasterConfirmBoxDialog } from './master-firm/master-delete-confirm-box.component';
import { CityDialog } from './master-city/create-city.component';
import { DeleteCityConfirmBoxDialog } from './master-city/master-delete-confirm-box.component';
import { DialogOverviewTypeDialog, MasterTypeComponent } from './master-type/master-type.component';
import { DialogOverviewPlcDialog, MasterPlcComponent } from './master-plc/master-plc.component';
import { DeletePropertyTypeConfirmBoxDialog } from './master-type/master-delete-confirm-box.component';
import { MasterLocationComponent, DialogOverviewLocationDialog } from './master-location/master-location.component';
import { DeleteLocationConfirmBoxDialog } from './master-location/master-delete-confirm-box.component';
import { DeleteBlockConfirmBoxDialog } from './master-block/master-delete-confirm-box.component';
import { DeletePLCConfirmBoxDialog } from './master-plc/master-delete-confirm-box.component';
import { DeleteProjectConfirmBoxDialog } from './master-project/master-delete-confirm-box.component';
//8import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';



export function highlightJsFactory(): any {
  hljs.registerLanguage('typescript', hljsTypescript);
  return hljs;
}

@NgModule({
  imports: [
  
  CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXTJwhYqJ6Pc7VXGRMTv40N1WRLqzuSNs'
    }),
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    MasterRouterModule
  ],
  entryComponents: [
                      DialogOverviewExampleDialog,
                      DeleteMasterConfirmBoxDialog,
                      DeleteLocationConfirmBoxDialog,
                      DeleteBlockConfirmBoxDialog,
                      DeleteProjectConfirmBoxDialog,
                      CityDialog,
                      DeleteCityConfirmBoxDialog,
                      DeletePropertyTypeConfirmBoxDialog,
                      DialogOverviewEProjectDialog,
                      DialogOverviewBlockDialog,
                      DialogOverviewTypeDialog,
                      DialogOverviewPlcDialog,
                      DialogOverviewLocationDialog,
                      DeletePLCConfirmBoxDialog,
                    ],
  declarations: [
    DialogOverviewExampleDialog,
    DeleteMasterConfirmBoxDialog,
    CityDialog,
    DeleteCityConfirmBoxDialog,
    DeleteLocationConfirmBoxDialog,
    DeletePropertyTypeConfirmBoxDialog,
    DeleteBlockConfirmBoxDialog,
    DialogOverviewEProjectDialog,
    DialogOverviewBlockDialog,
    DialogOverviewTypeDialog,
    DialogOverviewPlcDialog,
    DialogOverviewLocationDialog,
    MasterCityComponent,
    MasterProjectComponent,
    MasterBlockComponent,
    MasterProjectComponent,
    MasterBlockComponent,
    MasterTypeComponent,
    MasterPlcComponent,
    MasterFirmComponent,
    MasterLocationComponent,
    DeletePLCConfirmBoxDialog,
    DeleteProjectConfirmBoxDialog
   // LeafletMapComponent
],

  exports: [
    ],
    
      
})
export class MasterModule { }