-- 1. Revoke direct API execution of SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;

-- 2. Tighten public analytics inserts
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics;

CREATE POLICY "Anyone can insert valid analytics events"
ON public.analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (
  event_type = ANY (ARRAY['tool_usage'::text, 'page_view'::text, 'download'::text])
  AND event_data IS NOT NULL
  AND jsonb_typeof(event_data) = 'object'
  AND length(event_data::text) <= 1000
  AND (SELECT count(*) FROM jsonb_object_keys(event_data)) <= 15
);
