-- Run these SQL commands in your Supabase SQL Editor
-- Project: eivwpmzrksudjlbrtsou

-- 1. Create frameworks table
create table frameworks (
  id text primary key,
  title text not null,
  views bigint not null default 0,
  downloads bigint not null default 0,
  created_at timestamptz default now()
);

-- Insert initial GMF data
insert into frameworks (id, title, views, downloads)
values ('gmf', 'Gift Maturation Framework', 1284, 312);

-- 2. Create view deduplication table
create table framework_view_log (
  framework_id text references frameworks(id),
  visitor_id text not null,
  viewed_on date not null default current_date,
  primary key (framework_id, visitor_id, viewed_on)
);

-- 3. Create RPC function for incrementing views
create or replace function increment_view(p_framework_id text, p_visitor_id text)
returns void as $$
begin
  insert into framework_view_log (framework_id, visitor_id)
  values (p_framework_id, p_visitor_id)
  on conflict do nothing;

  if found then
    update frameworks set views = views + 1 where id = p_framework_id;
  end if;
end;
$$ language plpgsql security definer;

-- 4. Create RPC function for incrementing downloads
create or replace function increment_download(p_framework_id text)
returns void as $$
begin
  update frameworks set downloads = downloads + 1 where id = p_framework_id;
end;
$$ language plpgsql security definer;

-- 5. Enable Row Level Security
alter table frameworks enable row level security;

-- Allow public read access only
create policy "Public read" on frameworks for select using (true);

-- Block direct updates/inserts from clients (only RPC functions can write)
create policy "No direct writes" on frameworks for insert with check (false);
create policy "No direct updates" on frameworks for update using (false);

-- Allow view_log inserts via RPC only
alter table framework_view_log enable row level security;
create policy "No direct view_log writes" on framework_view_log for insert with check (false);
create policy "No direct view_log updates" on framework_view_log for update using (false);
