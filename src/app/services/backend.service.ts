import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reasons } from '../interfaces/reasons.interface';
import { ValidationData } from '../interfaces/validation-data.interface';

type ValidationResponseType = {
    statusCode: number,
    reasons?: Reasons,
    content?: ValidationData,
    message?: any
}
  
@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  private baseUrl = 'http://localhost:3000';
   
  constructor(private httpClient: HttpClient) { }
  
  postFile(formData: FormData) {
    return this.httpClient.post<{fileName: string}>(this.baseUrl + '/file', formData);
  }

  postValidationByFile(fileName: string) {
    return this.httpClient.post<ValidationResponseType>(this.baseUrl + '/movements/validation/file', {name: fileName});
  }
  
}