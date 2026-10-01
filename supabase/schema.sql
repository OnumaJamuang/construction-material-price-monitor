create table if not exists sources (
  id bigserial primary key,
  code text unique not null,
  name text not null,
  base_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id bigserial primary key,
  canonical_name text not null,
  brand text,
  category text,
  subcategory text,
  unit text,
  specification jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists listings (
  id bigserial primary key,
  source_id bigint not null references sources(id) on delete cascade,
  product_id bigint references products(id) on delete set null,
  source_sku text,
  source_name text not null,
  product_url text not null,
  image_url text,
  current_price numeric(12,2),
  regular_price numeric(12,2),
  promo_price numeric(12,2),
  currency text not null default 'THB',
  stock_status text,
  source_category text,
  raw_details jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_checked_at timestamptz,
  unique(source_id, product_url)
);

create table if not exists price_history (
  id bigserial primary key,
  listing_id bigint not null references listings(id) on delete cascade,
  price numeric(12,2),
  regular_price numeric(12,2),
  promo_price numeric(12,2),
  stock_status text,
  checked_at timestamptz not null default now()
);

create index if not exists idx_price_history_listing_checked
  on price_history(listing_id, checked_at desc);

create table if not exists crawl_logs (
  id bigserial primary key,
  source_id bigint references sources(id) on delete set null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null,
  items_found integer not null default 0,
  items_updated integer not null default 0,
  error_message text
);

insert into sources(code, name, base_url)
values ('dohome', 'DoHome', 'https://www.dohome.co.th/')
on conflict (code) do nothing;
