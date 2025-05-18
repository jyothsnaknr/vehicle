import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleItemComponent } from './vehicle-item.component';
import { By } from '@angular/platform-browser';

describe('VehicleItemComponent', () => {
  let component: VehicleItemComponent;
  let fixture: ComponentFixture<VehicleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on load', () => {
    beforeEach(() => {
      component.vehicleData = {
        id: '1',
        name: 'test_vehicle',
        manufacturer: 'test_manufacturer',
        model: 'test_model',
        mileage: 10000,
        fuel: 'petrol',
        type: 'test_type',
        vin: 'test_vin',
      }
      fixture.detectChanges();
    });

    it('should show vehicle item data', () => {
      const vehicleItem = fixture.debugElement.query(By.css('.vehicle-item-container')).nativeElement as HTMLElement;
      expect(vehicleItem.innerHTML).toContain('test_vehicle');
      expect(vehicleItem.innerHTML).toContain('test_manufacturer');
      expect(vehicleItem.innerHTML).toContain('test_model');
      expect(vehicleItem.innerHTML).toContain('10000');
    });
  });
});
