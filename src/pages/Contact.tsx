import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | ResizeLab</title>
        <meta name="description" content="Contact ResizeLab for questions, feedback, or suggestions about our free online image resizer tool." />
        <link rel="canonical" href="https://resizelab.app/contact" />
      </Helmet>

      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
          </div>
        </section>
      </div>

      <section className="container py-12">
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Mail className="mx-auto h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Email Us</h3>
              <p className="text-sm text-muted-foreground mt-1">
                support@resizelab.app
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Response Time</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Usually within 24-48 hours
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Is ResizeLab really free?</p>
                <p className="text-muted-foreground">Yes! ResizeLab is completely free to use with no hidden costs.</p>
              </div>
              <div>
                <p className="font-medium">Are my images stored on your servers?</p>
                <p className="text-muted-foreground">No. All processing happens in your browser. We never see or store your images.</p>
              </div>
              <div>
                <p className="font-medium">What formats do you support?</p>
                <p className="text-muted-foreground">We support JPEG, PNG, and WEBP for both input and output.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
