import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { IMGUR_CONFIG, IMGUR_CONTEXT } from '../shared/imgur.const';
import { ImgurImage, ImgurResponse } from '../shared/imgur.types';
import { map } from 'rxjs';

const context = new HttpContext().set(IMGUR_CONTEXT, IMGUR_CONFIG);

@Injectable({
  providedIn: 'root'
})
export class ImgurService {
  private readonly http = inject(HttpClient);

  auth() {
    return this.http;
  }

  getList() {
    return this.http.get<ImgurResponse>(`/account/JasmineBlossom/images`, {
      context
    }).pipe(
      map(res => res.data),
      map(data => data.map(d => ({
        height: d.height,
        id: d.id,
        width: d.width,
        link: d.link,
        name: d.name,
        size: d.size
      } as ImgurImage)))
    );
  }
}

export const imgur = () => inject(ImgurService);
