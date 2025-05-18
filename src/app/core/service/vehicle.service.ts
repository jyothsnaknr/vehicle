import { Injectable } from '@angular/core';
import { VehicleIntf } from '../../models/vehicle';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'https://67d4273b8bca322cc26c5b38.mockapi.io/';

  constructor(
    private http: HttpClient
  ) { }

  // API to get the list of vehicles
  public getVehicleList(): Observable<VehicleIntf[]> {
    const vehicleListUrl = `${this.apiUrl}vehicles`;
    return this.http.get<VehicleIntf[]>(vehicleListUrl).pipe(
        map(vehicles => 
          vehicles.filter(veh => veh.name !== '').sort((a, b) => a.name.localeCompare(b.name))
        ), catchError(err => { console.error(err); return of([]) })
      );
  }

  // API to get individual vehicle details
  public getVehicleDetails(vehicleId: string): Observable<VehicleIntf> {
    const vehicleListUrl = `${this.apiUrl}vehicles/${vehicleId}`;
    return this.http.get<VehicleIntf>(vehicleListUrl);
  }

  // API to add new vehicle
  public addVehicle(vehicleData: VehicleIntf): Observable<any> {
    const vehicleListUrl = `${this.apiUrl}vehicles`;
    return this.http.post<VehicleIntf>(vehicleListUrl, vehicleData).pipe(
      map(vData => ({success: true, data: vData})),
      catchError(err => of({success: false, error: err}))
    );
  }
}
