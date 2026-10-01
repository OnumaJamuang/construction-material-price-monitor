import { createClient } from "@supabase/supabase-js";
import { adapterFor } from "../src/adapters/index";

const url=process.env.SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});

async function collect(productUrl){
 const adapter=adapterFor(productUrl);
 const {data:source,error:sourceError}=await db.from("sources").select("id").eq("code",adapter.code).single();
 if(sourceError) throw sourceError;
 const {data:log,error:logError}=await db.from("crawl_logs").insert({source_id:source.id,status:"running"}).select("id").single();
 if(logError) throw logError;
 try{
  const item=await adapter.fetchProduct(productUrl);
  const listing={source_id:source.id,source_sku:item.sourceSku??null,source_name:item.sourceName,product_url:item.productUrl,image_url:item.imageUrl??null,current_price:item.currentPrice??null,regular_price:item.regularPrice??null,promo_price:item.promoPrice??null,currency:item.currency,stock_status:item.stockStatus??null,source_category:item.sourceCategory??null,raw_details:item.rawDetails??{},last_checked_at:new Date().toISOString()};
  const {data:saved,error:saveError}=await db.from("listings").upsert(listing,{onConflict:"source_id,product_url"}).select("id").single();
  if(saveError) throw saveError;
  const {error:historyError}=await db.from("price_history").insert({listing_id:saved.id,price:item.currentPrice??null,regular_price:item.regularPrice??null,promo_price:item.promoPrice??null,stock_status:item.stockStatus??null});
  if(historyError) throw historyError;
  await db.from("crawl_logs").update({status:"success",finished_at:new Date().toISOString(),items_found:1,items_updated:1}).eq("id",log.id);
  console.log(JSON.stringify({ok:true,source:item.sourceCode,sku:item.sourceSku,name:item.sourceName,price:item.currentPrice}));
 }catch(e){
  const message=e instanceof Error?e.message:String(e);
  await db.from("crawl_logs").update({status:"error",finished_at:new Date().toISOString(),error_message:message}).eq("id",log.id);
  throw e;
 }
}
const targets=process.argv.slice(2);
if(!targets.length) throw new Error("Pass one or more product URLs");
for(const target of targets) await collect(target);
