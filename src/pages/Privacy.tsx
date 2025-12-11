import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <Layout>
      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: December 1, 2024
            </p>
          </div>
        </section>
      </div>

      <section className="container py-12">
        <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
          <h2>Introduction</h2>
          <p>
            At ResizeLab, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our image resizing service.
          </p>

          <h2>Information We Don't Collect</h2>
          <p>
            ResizeLab is designed with privacy as a core principle. Here's what makes us different:
          </p>
          <ul>
            <li><strong>Your Images</strong>: All image processing happens directly in your browser using the HTML5 Canvas API. Your images are never uploaded to our servers.</li>
            <li><strong>Personal Data</strong>: We don't require registration or collect personal information to use our service.</li>
            <li><strong>Image Data</strong>: We cannot see, access, or store any images you process.</li>
          </ul>

          <h2>Information We May Collect</h2>
          <p>
            We may collect limited, non-personal information to improve our service:
          </p>
          <ul>
            <li><strong>Analytics Data</strong>: Anonymous usage statistics such as page views, feature usage, and general geographic regions.</li>
            <li><strong>Technical Information</strong>: Browser type, device type, and operating system for compatibility purposes.</li>
            <li><strong>Cookies</strong>: We use essential cookies for basic functionality and may use analytics cookies with your consent.</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We may use the following third-party services:
          </p>
          <ul>
            <li><strong>Google Analytics</strong>: For anonymous usage statistics</li>
            <li><strong>Google AdSense</strong>: For displaying advertisements (when implemented)</li>
          </ul>
          <p>
            These services may collect their own data according to their respective privacy policies.
          </p>

          <h2>Data Security</h2>
          <p>
            Since your images never leave your device, there's no risk of your image data being intercepted, breached, or misused. Your files remain completely under your control at all times.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our service is available to users of all ages. Since we don't collect personal information, there are no special provisions for children's data.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last updated" date at the top of this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our Contact page.
          </p>
        </div>
      </section>
    </Layout>
  );
}
