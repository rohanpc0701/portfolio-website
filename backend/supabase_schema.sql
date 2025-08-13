-- Projects table for Supabase (Postgres)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  long_description text not null,
  tech text[] not null default '{}',
  category text not null,
  featured boolean not null default false,
  github text not null,
  demo text null,
  image text not null,
  status text not null check (status in ('completed','in-progress')),
  highlights text[] not null default '{}',
  "order" int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Update trigger to keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- RLS: allow public read, restricted write (you can tighten further)
alter table public.projects enable row level security;

drop policy if exists "Projects read" on public.projects;
create policy "Projects read" on public.projects
  for select using (true);

-- For admin writes via service role; clients should not have anon write
drop policy if exists "Projects write" on public.projects;
create policy "Projects write" on public.projects
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');


