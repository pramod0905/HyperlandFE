import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { GoogleMapComponent } from './google-map/google-map.component';
//import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MasterFirmComponent } from './master-firm/master-firm.component';
import { MasterCityComponent } from './master-city/master-city.component';
import { MasterProjectComponent } from './master-project/master-project.component';
import { MasterBlockComponent } from './master-block/master-block.component';
import { MasterTypeComponent } from './master-type/master-type.component';
import { MasterPlcComponent } from './master-plc/master-plc.component';
import { MasterLocationComponent } from './master-location/master-location.component';

const masterRoutes: Routes = [
    {path: 'masterfirm', component: MasterFirmComponent , data: { animation: 'masterfirm' }},
    {path: 'mastercity', component: MasterCityComponent , data: { animation: 'mastercity' }},
    {path: 'masterproject', component: MasterProjectComponent , data: { animation: 'masterproject' }},
    {path: 'masterblock', component: MasterBlockComponent , data: { animation: 'masterblock' }},
    {path: 'mastertype', component: MasterTypeComponent , data: { animation: 'mastertype' }},
    {path: 'masterplc', component: MasterPlcComponent , data: { animation: 'masterplc' }},
    {path: 'masterlocation', component: MasterLocationComponent , data: { animation: 'masterlocation' }},
];

@NgModule({
  imports: [
    RouterModule.forChild(masterRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class MasterRouterModule {}