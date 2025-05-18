import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailComponent } from './vehicle-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { VehicleIntf } from '../../../models/vehicle';
import { VehicleService } from '../../../core/service/vehicle.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('VehicleDetailComponent', () => {
  let component: VehicleDetailComponent;
  let fixture: ComponentFixture<VehicleDetailComponent>;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        {
          provide: VehicleService,
          useClass: VehicleService
        }

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleDetailComponent);
    vehicleService = TestBed.inject(VehicleService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('on page load', () => {
    beforeEach(() => {
      const vehicleDetails: VehicleIntf = {
        id: '1',
        name: 'test_vehicle',
        manufacturer: 'test_manufacturer',
        model: 'test_model',
        mileage: 10000,
        fuel: 'petrol',
        type: 'test_type',
        vin: 'vin',
        color: 'veh_color'
      }
      spyOn<any>(vehicleService, 'getVehicleDetails').and.returnValue(of(vehicleDetails));
      fixture.detectChanges();
    });

    it('should call getVehicleDetails API', () => {
      expect(vehicleService.getVehicleDetails).toHaveBeenCalled();
    });

    it('should show vehicle details', () => {
      const vehicleItem = fixture.debugElement.query(By.css('.container')).nativeElement as HTMLElement;
      expect(vehicleItem.innerHTML).toContain('test_vehicle');
      expect(vehicleItem.innerHTML).toContain('test_manufacturer');
      expect(vehicleItem.innerHTML).toContain('test_model');
      expect(vehicleItem.innerHTML).toContain('10000');
      expect(vehicleItem.innerHTML).toContain('petrol');
      expect(vehicleItem.innerHTML).toContain('test_type');
      expect(vehicleItem.innerHTML).toContain('veh_color');
      expect(vehicleItem.innerHTML).toContain('vin');
    });
  })
});
