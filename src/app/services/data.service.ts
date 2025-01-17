import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly http = inject(HttpClient);

  getBackground() {
    return this.http.get(`/background`)
  }

  getImages() {
    return this.http.get(`/images`)
  }

  updateImages(id: number) {
    return this.http.put(`/account/JasmineBlossom/images`, {
      url: 'update de'
    })
  }
}

export const dataService = () => inject(DataService);
