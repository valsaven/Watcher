export interface Image {
  id: number;
  src: string;
  name: string;
  dimensions: string;
  ext: string;
  size: string;
  modifiedTime: string;
  selected: boolean;
  active: boolean;
  md5: string;
}

export type Images = Array<Image>
