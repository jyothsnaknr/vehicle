import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVehicleComponent } from './add-vehicle.component';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../../core/service/vehicle.service';
import { of } from 'rxjs';

describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [AddVehicleComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: VehicleService,
          useClass: VehicleService
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('if add vehicle form is completed', () => {
    beforeEach(() => {
      component.vehicleForm.setValue({
        name: 'test_vehicle',
        manufacturer: 'test_manufacturer',
        model: 'test_model',
        mileage: 10000,
        fuel: 'petrol',
        type: 'test_type',
        vin: 'test_vin',
        color: 'test_color'
      });
    });

    describe('and add button clicked', () => {
      beforeEach(() => {
        spyOn<any>(vehicleService, 'addVehicle').and.returnValue(of({ success: true}));
        component.addVehicle();
      });

      it('should call the add vehicle api', () => {
        expect(vehicleService.addVehicle).toHaveBeenCalled();
      });
    });
  });

  describe('if add vehicle form is incomplete', () => {
    beforeEach(() => {
      component.vehicleForm.setValue({
        name: '',
        manufacturer: '',
        model: 'test_model',
        mileage: 10000,
        fuel: 'petrol',
        type: 'test_type',
        vin: 'test_vin',
        color: 'test_color'
      });
    });

    describe('and add button clicked', () => {
      beforeEach(() => {
        spyOn<any>(vehicleService, 'addVehicle').and.returnValue(of({ success: true}));
        component.addVehicle();
      });

      it('should not call the add vehicle api', () => {
        expect(vehicleService.addVehicle).not.toHaveBeenCalled();
      });
    });
  });
});
