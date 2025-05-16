import { Component, OnInit } from '@angular/core';
import { VehicleIntf } from '../../../models/vehicle';
import { VehicleService } from '../../../core/service/vehicle.service';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddVehicleComponent } from '../../../shared/modal/add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {
  public successMsg: string = '';
  public vehicleList$: Observable<VehicleIntf[]> = of([]);

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) { 
  }

  public ngOnInit(): void {
    this.getVehicleList();
  }

  public getVehicleList(): void {
    this.vehicleList$ = this.vehicleService.getVehicleList();
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(res => {
      // if successfully added new vehicle, refresh the list
      if (res?.success) {
        this.successMsg = 'Successfully added new vehicle';
        setTimeout(() => {
          this.successMsg = '';
        }, 4000)
        this.getVehicleList();
      }
    });
  }
}
