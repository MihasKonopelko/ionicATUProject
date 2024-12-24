import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class HttpManagerService {

  constructor() { }

  async get(options:HttpOptions){
    const responce: HttpResponse = await CapacitorHttp.get(options);
    return responce;
  }


}
