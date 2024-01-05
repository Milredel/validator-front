import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidationResponseType } from '../types/validation-response.type';
import { ValidationData } from '../interfaces/validation-data.interface';
  
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

    postValidation(data: ValidationData) {
        return this.httpClient.post<ValidationResponseType>(this.baseUrl + '/movements/validation', data);
    }
  
}