import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { FileText, Scale, Shield, AlertCircle, Gavel, Globe, RefreshCw, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service – Usage Guidelines | Resizer Lab</title>
        <meta name="description" content="Resizer Lab terms of service. Read our terms and conditions for using our free online image resizing tool. Fair use policy." />
        <link rel="canonical" href="https://resizelab.app/terms" />
      </Helmet>
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
              Last updated: January 15, 2025
            </p>
          </div>
        </section>
      </div>

      {/* Key Points Highlights */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Scale className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Fair Use</h3>
              <p className="text-sm text-muted-foreground">
                Use our service responsibly and legally. We provide tools; you provide content.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Shield className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Your Content, Your Rights</h3>
              <p className="text-sm text-muted-foreground">
                You retain all rights to your images. We never claim ownership of your work.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Globe className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Free for Everyone</h3>
              <p className="text-sm text-muted-foreground">
                Our core resizing features are completely free with no hidden fees.
              </p>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using Resizer Lab ("the Service"), you accept and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Resizer Lab regarding your use of our free online image resizing tool. If you do not agree to these terms in their entirety, please do not use our service.
            </p>
            <p>
              These Terms of Service apply to all visitors, users, and others who access or use the Service. By using Resizer Lab, you represent that you are at least 13 years of age, or if you are under 13, that you have obtained parental or guardian consent to use this service. If you are using this service on behalf of an organization, you represent that you have the authority to bind that organization to these terms.
            </p>
            <p>
              We reserve the right to modify these terms at any time. When we make changes, we will update the "Last updated" date at the top of this page. Your continued use of the Service after any modifications indicates your acceptance of the updated terms. We encourage you to review these terms periodically to stay informed of any changes.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <FileText className="h-6 w-6 text-primary" />
              Comprehensive Description of Service
            </h2>
            <p>
              Resizer Lab provides a free, browser-based image resizing and conversion tool designed to help users quickly and easily modify their images without requiring software installation or technical expertise. Our service operates entirely within your web browser, utilizing modern web technologies to deliver a fast, secure, and private image editing experience.
            </p>
            <p>
              The service allows users to perform the following operations on their images:
            </p>
            <ul>
              <li><strong>Image Resizing</strong>: Upload images from your device and resize them by specifying exact dimensions (width and height in pixels), using preset sizes optimized for common use cases, or scaling by percentage</li>
              <li><strong>Aspect Ratio Control</strong>: Maintain or modify the aspect ratio of your images during the resizing process</li>
              <li><strong>Format Conversion</strong>: Convert images between popular formats including JPEG, PNG, and WEBP</li>
              <li><strong>Quality Adjustment</strong>: Control the compression level and output quality to balance file size and image quality</li>
              <li><strong>Instant Download</strong>: Download processed images immediately after resizing</li>
            </ul>
            <p>
              A key distinguishing feature of our service is that all processing occurs locally in your browser using the HTML5 Canvas API. This means your images are never uploaded to or stored on our servers, providing inherent privacy and security benefits that server-based alternatives cannot match.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Shield className="h-6 w-6 text-primary" />
              User Responsibilities and Acceptable Use
            </h2>
            <p>
              When using Resizer Lab, you agree to use the service responsibly and in compliance with all applicable laws and regulations. Specifically, you agree to:
            </p>
            <ul>
              <li><strong>Lawful Use</strong>: Use the service only for lawful purposes and in accordance with all applicable local, national, and international laws and regulations</li>
              <li><strong>Ownership Rights</strong>: Only process images that you own, have created, or have explicit permission to modify from the rightful owner</li>
              <li><strong>Respect Copyright</strong>: Not use the service to infringe upon the intellectual property rights of others, including copyrights, trademarks, and other proprietary rights</li>
              <li><strong>Prohibited Content</strong>: Not use the service to process, create, or distribute illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable content</li>
              <li><strong>Security</strong>: Not attempt to circumvent, disable, or interfere with any security features of the service</li>
              <li><strong>No Malicious Activity</strong>: Not use the service for any purpose that is fraudulent, deceptive, or designed to harm others</li>
              <li><strong>Technical Integrity</strong>: Not attempt to probe, scan, or test the vulnerability of the service, or breach any security measures</li>
            </ul>
            <p>
              We reserve the right to terminate or restrict access to users who violate these terms or engage in behavior that we deem harmful to the service or other users.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Gavel className="h-6 w-6 text-primary" />
              Intellectual Property Rights
            </h2>
            
            <h3>Your Images and Content</h3>
            <p>
              You retain all rights to your images and any content you process using our service. Since processing happens entirely in your browser and your images are never uploaded to our servers, we never have access to or claim any rights over your content. Your files remain completely under your ownership and control at all times.
            </p>
            <p>
              We do not assert any copyright, trademark, or other proprietary rights over images you create, modify, or process using our tools. You are free to use the output of our service for any purpose, commercial or non-commercial, without attribution to Resizer Lab (though we always appreciate a mention!).
            </p>

            <h3>Our Service and Platform</h3>
            <p>
              The Resizer Lab website, including its design, user interface, code, features, functionality, text content, graphics, logos, and overall look and feel, are protected by intellectual property laws including copyright, trademark, and trade secret laws. You may not copy, modify, distribute, sell, or lease any part of our service or its content without our prior written permission.
            </p>
            <p>
              The Resizer Lab name, logo, and any associated branding are trademarks of Resizer Lab. You may not use these marks without our express written permission, except as necessary to fairly identify or reference our service.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <AlertCircle className="h-6 w-6 text-primary" />
              Disclaimer of Warranties
            </h2>
            <p>
              Resizer Lab is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant or guarantee that:
            </p>
            <ul>
              <li>The service will be uninterrupted, timely, secure, or error-free</li>
              <li>Results obtained from the service will be accurate, reliable, or meet your specific requirements</li>
              <li>The quality of any products, services, information, or other material obtained through the service will meet your expectations</li>
              <li>The service will be compatible with all devices, browsers, or operating systems</li>
              <li>Any errors in the service will be corrected</li>
            </ul>
            <p>
              You understand and agree that your use of the service is at your sole risk. You are responsible for ensuring that any output from our service meets your requirements before using it for your intended purpose.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Scale className="h-6 w-6 text-primary" />
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Resizer Lab, its creators, operators, employees, affiliates, and licensors shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including but not limited to damages for loss of profits, goodwill, data, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to, use of, or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Any errors, bugs, or inaccuracies in the service</li>
            </ul>
            <p>
              In no event shall our total liability to you for all claims arising from or related to your use of the service exceed the amount you paid us for the service (which, since the service is free, is zero dollars).
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <RefreshCw className="h-6 w-6 text-primary" />
              Modifications to Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time, with or without notice. We may also update, modify, or remove features, functionality, or content at our discretion. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
            </p>
            <p>
              We are constantly working to improve our service and may introduce new features, change existing functionality, or deprecate certain capabilities. While we strive to maintain the core functionality that users rely on, we cannot guarantee that any specific feature will remain available indefinitely.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Globe className="h-6 w-6 text-primary" />
              Advertisements
            </h2>
            <p>
              Resizer Lab may display advertisements to support the operation and maintenance of our free service. These advertisements are provided by third-party advertising networks and are subject to their own terms and privacy policies. The display of advertisements does not constitute an endorsement by Resizer Lab of the advertised products or services.
            </p>
            <p>
              By using our service, you acknowledge and agree that we may display advertisements as part of the service. We strive to ensure that advertisements are non-intrusive and do not interfere with your use of our image resizing tools.
            </p>

            <h2 className="mt-12">Governing Law and Dispute Resolution</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from or relating to these terms or your use of the service shall be resolved through good-faith negotiation between the parties.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <MessageSquare className="h-6 w-6 text-primary" />
              Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or feedback about these Terms of Service or your use of Resizer Lab, we encourage you to reach out to us. We value user feedback and are committed to providing clear, helpful responses to all inquiries.
            </p>
            <p>
              You can contact us through our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>. We will make every effort to respond to your inquiry promptly and address any concerns you may have. For information on how we handle your data, please review our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
            <p>
              Learn more about our tool and team on our <Link to="/about" className="text-primary hover:underline">About page</Link>, or explore our <Link to="/blog" className="text-primary hover:underline">blog</Link> for tips on image optimization.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="mt-12 rounded-2xl border border-primary/20 bg-accent/30 p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Ready to Resize Your Images?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Now that you understand our terms, start using our free image resizer. No signup required—just fast, private, browser-based image processing.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Start Resizing Images →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
