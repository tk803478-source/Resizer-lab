
ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS featured_image text,
  ADD COLUMN IF NOT EXISTS author_name text DEFAULT 'Resizer Lab',
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS publish_date timestamp with time zone DEFAULT now();
