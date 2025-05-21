import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VehicleIntf } from '../../../models/vehicle';
import { VehicleService } from '../../../core/service/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent {
  public vehicleForm: FormGroup;
  public error: string = '';
  
  constructor(
    private dialogRef: MatDialogRef<AddVehicleComponent>,
    private fb: FormBuilder,
    private vehicleService: VehicleService
  ) {
    this.vehicleForm = this.fb.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      fuel: ['', Validators.required],
      type: ['', Validators.required],
      vin: ['', Validators.required],
      mileage: ['', [Validators.pattern(/^\d+$/), Validators.min(1)]],
      color: [''],
    });
  }

  // Add new vechicle 
  public addVehicle(): void {
    this.error = '';
    this.vehicleForm.markAllAsTouched();
    if (this.vehicleForm.valid) {
      const payload: VehicleIntf = this.vehicleForm.value;
      this.vehicleService.addVehicle(payload).subscribe({
        next: (res) => {
          //if add vehicle api successfully executed
          if (res.success) {
            this.dialogRef.close({success: true});
          } else { //if add vehicle api failed
            this.error = 'Error in adding vehicle. Please try again later';
          }
        } 
      });
    }
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }
}
