import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './feature/vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './feature/vehicle/vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full'
  },
  {
    path: 'vehicles',
    component: VehicleListComponent,
    loadChildren: () => import('./feature/vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'vehicle-detail/:id',
    component: VehicleDetailComponent
  },
  {
    path: '**',
    redirectTo: 'vehicles'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
