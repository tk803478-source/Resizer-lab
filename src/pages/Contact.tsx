import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Clock, HelpCircle, Shield, Zap, Image } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (error) throw error;
      
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us – Support & Feedback | Resizer Lab</title>
        <meta name="description" content="Get in touch with Resizer Lab. Questions about our free image resizer? We're here to help with support, feedback, or suggestions." />
        <link rel="canonical" href="https://resizelab.app/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Resizer Lab",
            "url": "https://resizelab.app/contact",
            "description": "Contact page for Resizer Lab support and inquiries."
          })}
        </script>
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
              Have questions, feedback, or suggestions? We'd love to hear from you. Our team is here to help with any inquiries about our free image resizing tool.
            </p>
          </div>
        </section>
      </div>

      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Contact Info Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Mail className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">
                support@resizelab.app
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                For all general inquiries
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Clock className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                Usually within 24-48 hours
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                We read every message
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Support Hours</h3>
              <p className="text-sm text-muted-foreground">
                Monday - Friday
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                9:00 AM - 6:00 PM UTC
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Whether you have a question about our image resizing tool, need help with a specific feature, want to report a bug, or simply want to share your feedback, we're always happy to hear from you. Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
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
                    placeholder="What can we help you with?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your question, feedback, or issue in detail. The more information you provide, the better we can assist you..."
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
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mb-8">
                Before reaching out, you might find your answer in our frequently asked questions below. We've compiled answers to the most common inquiries about Resizer Lab.
              </p>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Is Resizer Lab really free?</h3>
                      <p className="text-sm text-muted-foreground">
                        Yes! Resizer Lab is completely free to use with no hidden costs, no subscription fees, and no premium features locked behind a paywall. You can resize unlimited images without any charges.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Are my images stored on your servers?</h3>
                      <p className="text-sm text-muted-foreground">
                        No. All processing happens directly in your browser using the HTML5 Canvas API. Your images never leave your device, and we have absolutely no access to the files you process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <Image className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">What image formats do you support?</h3>
                      <p className="text-sm text-muted-foreground">
                        We support the most common image formats: JPEG (JPG), PNG, and WEBP. You can convert between these formats while resizing your images.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
                      <p className="text-sm text-muted-foreground">
                        Since all processing happens in your browser, the limit depends on your device's capabilities. Modern devices can typically handle images up to 50MB or more without issues.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Do I need to create an account?</h3>
                      <p className="text-sm text-muted-foreground">
                        No account is required! Simply visit our website and start resizing images immediately. We don't require any personal information to use our tool.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Can I use Resizer Lab for commercial projects?</h3>
                      <p className="text-sm text-muted-foreground">
                        Absolutely! You can use our tool for any purpose, including personal, commercial, and professional projects. There are no restrictions on how you use your resized images.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-bold mb-4 text-center">Still Need Help?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              If you couldn't find the answer you're looking for in our FAQs, don't hesitate to reach out. We're committed to providing excellent support and will do our best to help you with any issues or questions you may have about our image resizing service.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                to="/guides"
                className="rounded-xl border border-border bg-background p-5 text-center hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">Browse Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our comprehensive guides and tutorials
                </p>
              </Link>
              <Link
                to="/blog"
                className="rounded-xl border border-border bg-background p-5 text-center hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">Read Our Blog</h3>
                <p className="text-sm text-muted-foreground">
                  Tips, tricks, and best practices for image optimization
                </p>
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-border bg-background p-5 text-center hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">About Us</h3>
                <p className="text-sm text-muted-foreground">
                  Learn more about Resizer Lab and our mission
                </p>
              </Link>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-12 rounded-2xl gradient-primary p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-bold mb-3">Ready to Resize Your Images?</h3>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-6">
              Try our free image resizer now. No signup required—just fast, private, browser-based image processing.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-background text-foreground font-medium hover:bg-accent transition-colors"
            >
              Start Resizing →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
