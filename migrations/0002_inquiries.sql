create table if not exists inquiries (
  id serial primary key,
  full_name text not null,
  email text not null,
  phone text not null default '',
  business_name text not null default '',
  service text not null default '',
  budget text not null default '',
  details text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on inquiries (created_at desc);
