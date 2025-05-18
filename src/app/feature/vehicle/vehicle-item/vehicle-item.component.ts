import { Component, Input } from '@angular/core';
import { VehicleIntf } from '../../../models/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.scss'
})
export class VehicleItemComponent {
  @Input() vehicleData: VehicleIntf = {} as VehicleIntf;

  constructor(private router: Router) {

  }

  public openVehicleDetail(id: any): void {
    this.router.navigate(['/vehicles/detail',id])
  }
}
