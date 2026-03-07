ALTER TABLE public.blog_posts 
ADD COLUMN display_locations text[] NOT NULL DEFAULT '{blog_page}'::text[],
ADD COLUMN is_featured boolean NOT NULL DEFAULT false,
ADD COLUMN linked_pages text[] NOT NULL DEFAULT '{}'::text[];