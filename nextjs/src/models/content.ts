// These are Typescript models for the API which returns the list of 
// Stories rows for the homepage. This model contains most of the variables
// which are typically needed to customize the look and content of a
// Stories row or grid. Feel free to copy them directly into your project.

export interface ContentModel {
  fields: VerticalVideoList;
}

export interface VerticalVideoList {
  count?: number;
  layout: keyof typeof Layout;
  moreButtonTitle?: string;
  size: keyof typeof Size;
  sortOrder: number;
  tileType: keyof typeof TileType;
  title?: string;
  videoType: keyof typeof VideoType;
  categories?: string[];
  collection?: string;
  internalTitle: string;
  id: string;
}

export enum Layout {
  'row' = 'row',
  'grid' = 'grid',
}

export enum Size {
  'regular' = 'regular',
  'medium' = 'medium',
  'large' = 'large',
}

export enum TileType {
  'round' = 'round',
  'rectangular' = 'rectangular',
}

export enum VideoType {
  'stories' = 'stories',
  'clips' = 'clips',
}
