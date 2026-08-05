import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // --- Authentication: only signed-in users may spend paid API quota ---
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return json({ error: 'You must be signed in to generate images.' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return json({ error: 'You must be signed in to generate images.' }, 401);
    }
    const userId = claimsData.claims.sub;

    // --- Input validation ---
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'Invalid request body.' }, 400);
    }

    const prompt = (body as { prompt?: unknown })?.prompt;
    if (typeof prompt !== 'string') {
      return json({ error: 'Prompt is required.' }, 400);
    }
    const cleanPrompt = prompt.trim();
    if (cleanPrompt.length < 3 || cleanPrompt.length > 1000) {
      return json({ error: 'Prompt must be between 3 and 1000 characters.' }, 400);
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');
      return json({ error: 'Image generation is not available right now.' }, 500);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`;

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: cleanPrompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('Gemini error for user', userId, data);
      if (resp.status === 429) {
        return json({ error: 'Image generation is busy. Please try again later.' }, 429);
      }
      return json({ error: 'Image generation failed. Please try again.' }, 502);
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imgPart = parts.find((p: { inlineData?: { data?: string } }) => p.inlineData?.data);
    if (!imgPart) {
      console.error('No image returned from Gemini', data);
      return json({ error: 'No image was generated. Try a different prompt.' }, 502);
    }

    const mime = imgPart.inlineData.mimeType || 'image/png';
    return json({ imageUrl: `data:${mime};base64,${imgPart.inlineData.data}` }, 200);
  } catch (e) {
    console.error('generate-image unexpected error:', e);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
