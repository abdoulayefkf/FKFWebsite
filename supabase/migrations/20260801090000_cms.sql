create table if not exists public.cms_pages (
  path text primary key check (path like '/%'),
  eyebrow text not null default '', title text not null, description text not null default '',
  image text, sections jsonb not null default '[]'::jsonb,
  cta jsonb, published boolean not null default true,
  updated_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.site_settings (
  id text primary key default 'global' check (id = 'global'),
  organization_name text not null default 'Francis Koroma Foundation',
  logo_url text not null default '/fkf-logo.png', contact_email text not null default 'info@franciskoromafoundation.org',
  hero_title text not null default 'Empowering the Next Generation of Global Leaders and Changemakers',
  hero_description text not null default 'The Francis Koroma Foundation is a U.S.-based 501(c)(3) nonprofit organization committed to helping young people successfully navigate the transition into adulthood through academic support, mentorship opportunities, leadership training, and personal development initiatives.',
  hero_video_url text not null default 'https://www.youtube.com/embed/De-BByJLQxw?autoplay=1&mute=1&loop=1&playlist=De-BByJLQxw&controls=0&modestbranding=1',
  updated_by uuid references auth.users(id), updated_at timestamptz not null default now()
);
create table if not exists public.cms_videos (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
  video_url text not null, thumbnail_url text, published boolean not null default true, sort_order integer not null default 0,
  updated_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
insert into public.site_settings(id) values ('global') on conflict (id) do nothing;
alter table public.cms_pages enable row level security;
alter table public.site_settings enable row level security;
alter table public.cms_videos enable row level security;
drop policy if exists "Public reads published CMS pages" on public.cms_pages;
create policy "Public reads published CMS pages" on public.cms_pages for select using (published or public.is_staff());
drop policy if exists "Public reads site settings" on public.site_settings;
create policy "Public reads site settings" on public.site_settings for select using (true);
drop policy if exists "Public reads published videos" on public.cms_videos;
create policy "Public reads published videos" on public.cms_videos for select using (published or public.is_staff());
drop policy if exists "Staff manages CMS pages" on public.cms_pages;
create policy "Staff manages CMS pages" on public.cms_pages for all using (public.is_staff()) with check (public.is_staff());
drop policy if exists "Staff manages site settings" on public.site_settings;
create policy "Staff manages site settings" on public.site_settings for all using (public.is_staff()) with check (public.is_staff());
drop policy if exists "Staff manages videos" on public.cms_videos;
create policy "Staff manages videos" on public.cms_videos for all using (public.is_staff()) with check (public.is_staff());
grant select on public.cms_pages, public.site_settings, public.cms_videos to anon, authenticated;
grant insert, update, delete on public.cms_pages, public.site_settings, public.cms_videos to authenticated, service_role;
update storage.buckets set file_size_limit = 52428800, allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml','video/mp4','video/webm','video/ogg'] where id = 'website-media';
