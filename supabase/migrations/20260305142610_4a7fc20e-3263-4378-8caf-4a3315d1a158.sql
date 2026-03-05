
-- Fix blog_posts RLS: drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can read all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON public.blog_posts;

-- Permissive SELECT: anyone can read published posts
CREATE POLICY "Anyone can read published blog posts"
ON public.blog_posts FOR SELECT
USING (is_published = true);

-- Permissive SELECT: admins can read all posts
CREATE POLICY "Admins can read all blog posts"
ON public.blog_posts FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin full management (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
