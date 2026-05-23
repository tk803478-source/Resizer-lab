import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true);
    setImageUrl(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (!data?.imageUrl) throw new Error("No image returned");
      setImageUrl(data.imageUrl);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `generated-${Date.now()}.png`;
    a.click();
  };

  return (
    <Layout>
      <Helmet>
        <title>AI Image Generator | Resizer Lab</title>
        <meta name="description" content="Generate stunning AI images from text prompts using Google Gemini. Free, fast, and easy to use." />
        <link rel="canonical" href="https://resizerlab.lovable.app/image-generator" />
      </Helmet>

      <section className="container py-12 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">AI Image</span> Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe what you want to see and let Gemini create it for you.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="A cinematic shot of a futuristic city at sunset, neon lights, ultra detailed..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <Button
              variant="hero"
              size="lg"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <><Loader2 className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles /> Generate Image</>
              )}
            </Button>
          </CardContent>
        </Card>

        {imageUrl && (
          <Card>
            <CardContent className="p-6">
              <img src={imageUrl} alt={prompt} className="w-full rounded-lg mb-4" />
              <Button onClick={handleDownload} variant="outline" className="w-full">
                <Download /> Download Image
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </Layout>
  );
}
