import type { SourceAdapter, NormalizedListing } from "./types";

export const dohomeAdapter: SourceAdapter = {
  code: "dohome",

  supports(url: string) {
    return url.includes("dohome.co.th");
  },

  async fetchProduct(url: string): Promise<NormalizedListing> {
    throw new Error(
      "DoHome adapter scaffold is ready. Implement extraction only after confirming permitted access method and page structure."
    );
  }
};
