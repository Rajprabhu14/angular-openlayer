import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private httpClient: HttpClient) { }

  getGFIResponse(url, layerName) {
    return this.httpClient.get<any>(url).pipe(
      tap(
          data => {
            data.layerName = layerName
          },
          error =>  error
      )
    );
  }
}
