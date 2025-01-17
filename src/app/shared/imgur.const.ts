import { HttpContextToken } from '@angular/common/http';

export interface ImgurConfig {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
  accessToken: {
    Authorization: string;
  }
}

export const IMGUR_CONFIG: ImgurConfig = {
  apiUrl: 'https://api.imgur.com/3',
  clientId: 'b1eb7e5e9a6f3c3',
  clientSecret: '76bd5dbeea5b4bf8983e10fc5f5b8705f07bee01',
  accessToken: {
    Authorization: `Bearer fa7d5cd7ba851b306b5151db1f6f664d1f2d1178`
  }
};

export const IMGUR_CONTEXT = new HttpContextToken<ImgurConfig | null>(() => null)
