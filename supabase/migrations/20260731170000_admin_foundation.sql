create type public.user_role as enum ('OWNER', 'ADMINISTRATOR', 'EDITOR');
create type public.user_status as enum ('ACTIVE', 'SUSPENDED', 'DISABLED', 'INVITED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null unique,
  phone text,
  profile_photo text,
  role public.user_role not null default 'EDITOR',
  status public.user_status not null default 'INVITED',
  last_login timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null,
  two_factor_enabled boolean not null default false,
  must_change_password boolean not null default true,
  locked_until timestamptz
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  target_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);
create index audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index audit_logs_actor_id_idx on public.audit_logs(actor_id);
create index audit_logs_target_id_idx on public.audit_logs(target_user_id);

create or replace function public.is_owner(check_user uuid default auth.uid()) returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = check_user and role = 'OWNER' and status = 'ACTIVE');
$$;
create or replace function public.is_staff(check_user uuid default auth.uid()) returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles where id = check_user and role in ('OWNER','ADMINISTRATOR','EDITOR') and status = 'ACTIVE');
$$;

create or replace function public.handle_new_auth_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, first_name, last_name, email, phone, role, status, created_by)
  values(new.id, coalesce(new.raw_user_meta_data->>'first_name',''), coalesce(new.raw_user_meta_data->>'last_name',''), new.email,
    nullif(new.raw_user_meta_data->>'phone',''), coalesce((new.raw_user_meta_data->>'role')::public.user_role,'EDITOR'),
    coalesce((new.raw_user_meta_data->>'status')::public.user_status,'INVITED'), nullif(new.raw_user_meta_data->>'created_by','')::uuid)
  on conflict(id) do nothing; return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_auth_user();

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.audit_logs enable row level security;
create policy "users read own profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "owners read profiles" on public.profiles for select to authenticated using (public.is_owner());
create policy "owners update profiles" on public.profiles for update to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "owners read audit logs" on public.audit_logs for select to authenticated using (public.is_owner());
create policy "authenticated insert audit" on public.audit_logs for insert to authenticated with check (actor_id = auth.uid());

create policy "staff upload website media" on storage.objects for insert to authenticated with check (bucket_id = 'website-media' and public.is_staff());
create policy "staff update website media" on storage.objects for update to authenticated using (bucket_id = 'website-media' and public.is_staff()) with check (bucket_id = 'website-media' and public.is_staff());
create policy "staff delete website media" on storage.objects for delete to authenticated using (bucket_id = 'website-media' and public.is_staff());
create policy "staff read private documents" on storage.objects for select to authenticated using (bucket_id = 'private-documents' and public.is_staff());
create policy "staff upload private documents" on storage.objects for insert to authenticated with check (bucket_id = 'private-documents' and public.is_staff());
create policy "staff update private documents" on storage.objects for update to authenticated using (bucket_id = 'private-documents' and public.is_staff()) with check (bucket_id = 'private-documents' and public.is_staff());
create policy "staff delete private documents" on storage.objects for delete to authenticated using (bucket_id = 'private-documents' and public.is_staff());

revoke all on function public.is_owner(uuid) from public;
revoke all on function public.is_staff(uuid) from public;
grant execute on function public.is_owner(uuid) to authenticated;
grant execute on function public.is_staff(uuid) to authenticated;
