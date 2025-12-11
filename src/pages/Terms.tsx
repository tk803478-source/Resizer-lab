import { Layout } from "@/components/layout/Layout";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <Layout>
      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: December 1, 2024
            </p>
          </div>
        </section>
      </div>

      <section className="container py-12">
        <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using ResizeLab ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>

          <h2>Description of Service</h2>
          <p>
            ResizeLab provides a free, browser-based image resizing tool. The service allows users to:
          </p>
          <ul>
            <li>Upload images from their device</li>
            <li>Resize images using various methods (dimensions, percentage, presets)</li>
            <li>Convert images between formats (JPEG, PNG, WEBP)</li>
            <li>Download processed images</li>
          </ul>
          <p>
            All processing occurs locally in your browser. No images are uploaded to or stored on our servers.
          </p>

          <h2>User Responsibilities</h2>
          <p>
            When using ResizeLab, you agree to:
          </p>
          <ul>
            <li>Use the service only for lawful purposes</li>
            <li>Only process images you own or have permission to modify</li>
            <li>Not attempt to circumvent any security features</li>
            <li>Not use the service to process illegal or harmful content</li>
            <li>Respect intellectual property rights of others</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            <strong>Your Images</strong>: You retain all rights to your images. Since processing happens in your browser, we never have access to or claim any rights over your content.
          </p>
          <p>
            <strong>Our Service</strong>: The ResizeLab website, design, code, and content are protected by intellectual property laws. You may not copy, modify, or distribute our service without permission.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            ResizeLab is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that:
          </p>
          <ul>
            <li>The service will be uninterrupted or error-free</li>
            <li>Results will meet your specific requirements</li>
            <li>The service will be compatible with all devices or browsers</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ResizeLab and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
          </p>

          <h2>Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the service at any time without notice. We may also update these Terms of Service periodically.
          </p>

          <h2>Advertisements</h2>
          <p>
            ResizeLab may display advertisements to support the free service. These ads are provided by third-party services and are subject to their own terms and privacy policies.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us through our Contact page.
          </p>
        </div>
      </section>
    </Layout>
  );
}
