import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../core/service/vehicle.service';
import { VehicleIntf } from '../../../models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  public vehicleId: number = 0;
  public vehicleDetail: VehicleIntf = {} as VehicleIntf;
  public loading: boolean = true;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    if (vehicleId) {
      this.vehicleService.getVehicleDetails(vehicleId).subscribe({
        next: (data) => {
          this.vehicleDetail = data;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  public redirectBack() {
    this.router.navigate(['/vehicles']);
  }
}
