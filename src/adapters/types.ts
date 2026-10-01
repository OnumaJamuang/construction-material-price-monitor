export type NormalizedListing = {
  sourceCode: string;
  sourceSku?: string;
  sourceName: string;
  productUrl: string;
  imageUrl?: string;
  currentPrice?: number;
  regularPrice?: number;
  promoPrice?: number;
  currency: "THB";
  stockStatus?: string;
  sourceCategory?: string;
  rawDetails?: Record<string, unknown>;
};

export interface SourceAdapter {
  code: string;
  supports(url: string): boolean;
  fetchProduct(url: string): Promise<NormalizedListing>;
}
