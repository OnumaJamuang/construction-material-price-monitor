import type { NormalizedListing,SourceAdapter } from "./types";

function money(v:string|undefined){if(!v)return undefined;const n=Number(v.replace(/,/g,""));return Number.isFinite(n)?n:undefined}
function clean(v:string){return v.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim()}
function jsonLd(html:string){const out:any[]=[];const re=/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;let m;while((m=re.exec(html))){try{const x=JSON.parse(m[1]);out.push(...(Array.isArray(x)?x:[x]))}catch{}}return out.flatMap(x=>x?.["@graph"]||x)}
function productLd(html:string){return jsonLd(html).find((x:any)=>{const t=x?.["@type"];return t==="Product"||(Array.isArray(t)&&t.includes("Product"))})}
export function parseDohome(html:string,url:string):NormalizedListing{
 const p:any=productLd(html)||{};const offer=Array.isArray(p.offers)?p.offers[0]:p.offers||{};
 const title=p.name||html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
 const sku=String(p.sku||p.productID||url.match(/(\d{8})(?:\.html)?(?:[/?#]|$)/)?.[1]||"");
 const text=clean(html);
 const current=money(String(offer.price||text.match(/฿\s*([\d,]+(?:\.\d{1,2})?)/)?.[1]||""));
 const unit=text.match(/฿\s*[\d,]+(?:\.\d{1,2})?\s*\/\s*([^\s<]+)/)?.[1];
 const regular=money(text.match(/ราคาปกติ\s*฿?\s*([\d,]+(?:\.\d{1,2})?)/)?.[1]);
 const image=typeof p.image==="string"?p.image:Array.isArray(p.image)?p.image[0]:p.image?.url;
 if(!title||!current)throw new Error("Unable to identify DoHome product name/price");
 return {sourceCode:"dohome",sourceSku:sku||undefined,sourceName:clean(title),productUrl:url,imageUrl:image,currentPrice:current,regularPrice:regular,currency:"THB",stockStatus:/สินค้าหมด/.test(text)?"out_of_stock":/พร้อมจัดส่ง/.test(text)?"in_stock":undefined,rawDetails:{unit,brand:typeof p.brand==="string"?p.brand:p.brand?.name}};
}
export const dohomeAdapter:SourceAdapter={code:"dohome",supports:url=>/https?:\/\/(www\.)?dohome\.co\.th\//i.test(url),async fetchProduct(url){const r=await fetch(url,{headers:{"user-agent":"ConstructionMaterialPriceMonitor/1.0 (price research; low frequency)","accept-language":"th-TH,th;q=0.9,en;q=0.7"}});if(!r.ok)throw new Error(`DoHome HTTP ${r.status}`);return parseDohome(await r.text(),url)}};
