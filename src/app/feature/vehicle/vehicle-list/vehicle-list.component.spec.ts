import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListComponent } from './vehicle-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { VehicleIntf } from '../../../models/vehicle';
import { By } from '@angular/platform-browser';
import { VehicleItemComponent } from '../vehicle-item/vehicle-item.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddVehicleComponent } from '../../../shared/modal/add-vehicle/add-vehicle.component';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({ success: true }),
    open: {},
    close: {},
  }) as MatDialogRef<AddVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        VehicleListComponent,
        VehicleItemComponent
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on page load', () => {
    beforeEach(() => {
      const mockVehicleList: VehicleIntf[] = [
        {
          id: '1',
          name: 'test_vehicle',
          manufacturer: 'test_manufacturer',
          model: 'test_model',
          mileage: 10000,
          fuel: 'petrol',
          type: 'test_type',
          vin: 'test_vin',
        }
      ];
      component.vehicleList$ = of(mockVehicleList);
      fixture.detectChanges();
    }),

    it('should load the vehicle item component', () => {
      const vehicleItem = fixture.debugElement.query(By.directive(VehicleItemComponent));
      expect(vehicleItem).toBeTruthy();
    });
    
    it('should show vehicle item data', () => {
      const vehicleItem = fixture.debugElement.query(By.css('app-vehicle-item .vehicle-item-container')).nativeElement as HTMLElement;
      expect(vehicleItem.innerHTML).toContain('test_vehicle');
      expect(vehicleItem.innerHTML).toContain('test_manufacturer');
      expect(vehicleItem.innerHTML).toContain('test_model');
      expect(vehicleItem.innerHTML).toContain('10000');
    });

    it('should show add new vehicle button', () => {
      const addBtn = fixture.debugElement.query(By.css('.add-btn')).nativeElement as HTMLButtonElement;
      expect(addBtn).toBeTruthy();
    });

    describe('and when add new vehicle is clicked', () => {
      beforeEach(() => {
        const addBtn = fixture.debugElement.query(By.css('.add-btn')).nativeElement as HTMLButtonElement;
        addBtn.click();
      });

      it('should show add vehicle popup', () => {
        expect(dialogSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith(AddVehicleComponent, { width: '800px'});
      });
    });
  })
});
