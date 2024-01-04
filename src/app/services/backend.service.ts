import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  private baseUrl = 'http://localhost:3000';
   
  constructor(private httpClient: HttpClient) { }
  
  postFile(formData: FormData) {
    return this.httpClient.post<{fileName: string}>(this.baseUrl + '/file', formData);
  }
  
}