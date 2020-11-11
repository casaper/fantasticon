export enum FontAssetType {
  EOT = 'eot',
  WOFF2 = 'woff2',
  WOFF = 'woff',
  TTF = 'ttf',
  SVG = 'svg'
}

export enum OtherAssetType {
  CSS = 'css',
  SCSS = 'scss',
  HTML = 'html',
  JSON = 'json',
  TS = 'ts'
}

export const ASSET_TYPES = {
  ...FontAssetType,
  ...OtherAssetType
};

export type AssetType = FontAssetType | OtherAssetType;
