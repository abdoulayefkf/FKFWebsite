drop policy if exists "staff read website media" on storage.objects;
create policy "staff read website media" on storage.objects for select to authenticated
using (bucket_id = 'website-media' and public.is_staff());
