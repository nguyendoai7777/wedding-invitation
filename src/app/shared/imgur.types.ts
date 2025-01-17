export interface ImgurImage {
  id: string;
  name: string;
  link: string;
  width: number;
  height: number;
  size: number;
}

export interface ImgurImageProps extends ImgurImage {
  title: string | null;
  description: string | null;
  datetime: number;
  type: string;
  animated: boolean;
  views: number;
  bandwidth: number;
  vote: null;
  favorite: boolean;
  nsfw: null;
  section: string | null;
  account_url: string;
  account_id: number;
  is_ad: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  tags: any[];
  ad_type: number;
  ad_url: string;
  edited: string;
  in_gallery: boolean;
  deletehash: string;
}

export interface ImgurResponse {
  data: ImgurImageProps[];
  status: number;
  success: boolean;
}
