import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class SizeService extends DataService {

  constructor(http: HttpClient) { 
    super('/sizes', http)
  }
}
