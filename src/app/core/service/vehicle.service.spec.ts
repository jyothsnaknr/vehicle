import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleIntf } from '../../models/vehicle';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVehicleList', () => {
    it('should call get vehicles api', () => {
      service.getVehicleList().subscribe();
      const httpReq = httpMock.expectOne('https://67d4273b8bca322cc26c5b38.mockapi.io/vehicles');
      expect(httpReq.request.method).toBe('GET');
    })
  });
  
  describe('getVehicleDetails', () => {
    it('should call get vehicle details api', () => {
      service.getVehicleDetails(1).subscribe();
      const httpReq = httpMock.expectOne('https://67d4273b8bca322cc26c5b38.mockapi.io/vehicles/1');
      expect(httpReq.request.method).toBe('GET');
    })
  });
  
  describe('addVehicle', () => {
    it('should call add vehicle api', () => {
      const vehiclePayload: VehicleIntf = {
        id: '1',
        name: 'test_vehicle',
        manufacturer: 'test_manufacturer',
        model: 'test_model',
        mileage: 10000,
        fuel: 'petrol',
        type: 'test_type',
        vin: 'test_vin'
      }
      service.addVehicle(vehiclePayload).subscribe();
      const httpReq = httpMock.expectOne('https://67d4273b8bca322cc26c5b38.mockapi.io/vehicles');
      expect(httpReq.request.method).toBe('POST');
    })
  });
});
