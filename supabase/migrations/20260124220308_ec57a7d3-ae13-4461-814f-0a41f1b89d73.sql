-- Fix analytics INSERT policy to require basic validation
DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.analytics;

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics FOR INSERT
  WITH CHECK (
    event_type IS NOT NULL AND 
    event_type IN ('tool_usage', 'page_view', 'download')
  );

-- The contact_messages INSERT policy is intentionally permissive 
-- as contact forms need to work for unauthenticated users
-- Adding basic validation instead
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    message IS NOT NULL AND
    length(name) > 0 AND
    length(email) > 0 AND
    length(message) > 0
  );