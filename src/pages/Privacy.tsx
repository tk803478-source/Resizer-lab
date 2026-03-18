import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Shield, Lock, Eye, Server, Cookie, UserCheck, Bell, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy – Your Data Stays Private | Resizer Lab</title>
        <meta name="description" content="Resizer Lab privacy policy. 100% browser-based processing means your images never leave your device. Zero data collection." />
        <link rel="canonical" href="https://resizerlab.lovable.app/privacy" />
      </Helmet>
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
              Last updated: January 15, 2025
            </p>
          </div>
        </section>
      </div>

      {/* Privacy Highlights */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Lock className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">100% Browser-Based</h3>
              <p className="text-sm text-muted-foreground">
                All image processing happens locally on your device. Your files never touch our servers.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Eye className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">No Image Access</h3>
              <p className="text-sm text-muted-foreground">
                We cannot see, access, or store any images you process using our tool.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <Server className="mx-auto h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">No Server Storage</h3>
              <p className="text-sm text-muted-foreground">
                Zero images are uploaded or stored on any external server whatsoever.
              </p>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Introduction to Our Privacy Commitment
            </h2>
            <p>
              At Resizer Lab, we believe that privacy is a fundamental right, not a feature. This Privacy Policy explains in detail how we collect, use, protect, and handle your information when you use our free online image resizing service. We have designed our platform from the ground up with privacy as the cornerstone of our architecture, ensuring that your personal data and images remain completely under your control at all times.
            </p>
            <p>
              Unlike traditional image editing tools that require you to upload your files to remote servers for processing, Resizer Lab operates entirely within your web browser. This innovative approach means that your images never leave your device, eliminating the risks associated with server-side processing, data breaches, and unauthorized access to your personal photos and graphics.
            </p>
            <p>
              We understand that images can contain sensitive information—from personal photographs of family and friends to confidential business documents and proprietary designs. That's why we've built a tool that respects your privacy by design, not as an afterthought. This document will help you understand exactly what happens when you use our service and why you can trust us with your image editing needs.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Lock className="h-6 w-6 text-primary" />
              Information We Don't Collect
            </h2>
            <p>
              Resizer Lab is designed with privacy as a core principle that guides every aspect of our development process. Here's a comprehensive explanation of what makes our service fundamentally different from other image processing tools:
            </p>
            
            <h3>Your Images Remain Private</h3>
            <p>
              All image processing happens directly in your browser using the HTML5 Canvas API, a standardized web technology built into every modern browser. When you upload an image to our tool, it is loaded into your browser's memory—not transmitted to any external server. The resizing, format conversion, and quality adjustments all occur locally on your device using your computer's or smartphone's processing power.
            </p>
            <p>
              This means that whether you're resizing personal vacation photos, professional portfolio images, confidential business graphics, or sensitive medical imagery, your files remain completely private. We literally cannot access your images because they never pass through our infrastructure. This is a fundamental architectural decision that prioritizes your privacy above all else.
            </p>

            <h3>No Personal Data Required</h3>
            <p>
              We don't require registration, login, or any personal information to use our service. You can visit our website and start resizing images immediately without providing your name, email address, phone number, or any other identifying information. We believe that access to basic image editing tools should be simple, immediate, and free from unnecessary data collection requirements.
            </p>
            <p>
              This approach stands in contrast to many online services that require account creation and data harvesting before allowing access to basic features. At Resizer Lab, we respect that you simply want to resize an image—not engage in a lengthy onboarding process that collects personal data for marketing purposes.
            </p>

            <h3>No Image Storage or Retention</h3>
            <p>
              Because your images are processed entirely within your browser, there is no server-side storage of your files whatsoever. We don't have image databases, cloud storage buckets, or backup systems containing your photos. When you close your browser tab or navigate away from our site, your images exist only on your own device—exactly where you want them to be.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Cookie className="h-6 w-6 text-primary" />
              Information We May Collect
            </h2>
            <p>
              While we prioritize minimal data collection, we may gather limited, non-personal information to improve our service and ensure optimal performance for all users:
            </p>

            <h3>Analytics Data</h3>
            <p>
              We may use analytics services to collect anonymous usage statistics such as page views, feature usage patterns, general geographic regions (at the country level), and aggregate usage trends. This data helps us understand how people use our tool, which features are most popular, and where we can make improvements. Importantly, this analytics data is never linked to individual users or their images.
            </p>

            <h3>Technical Information</h3>
            <p>
              To ensure compatibility and optimal performance, we may collect general technical information such as browser type, device category (desktop, tablet, mobile), and operating system. This information helps us identify and fix compatibility issues and optimize our tool for the devices and browsers our users actually use.
            </p>

            <h3>Cookies and Local Storage</h3>
            <p>
              We use essential cookies and local storage for basic functionality, such as remembering your preferred settings (like output format or quality level) between sessions. These cookies enhance your user experience by eliminating the need to reconfigure your preferences each time you visit. We may also use analytics cookies with your consent to gather anonymous usage data.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Server className="h-6 w-6 text-primary" />
              Third-Party Services
            </h2>
            <p>
              We may use the following third-party services to support our operations:
            </p>
            <ul>
              <li><strong>Google Analytics</strong>: For anonymous usage statistics and understanding aggregate user behavior patterns</li>
              <li><strong>Google AdSense</strong>: For displaying relevant advertisements that help support our free service</li>
              <li><strong>Content Delivery Networks (CDNs)</strong>: For fast, reliable delivery of our website assets worldwide</li>
            </ul>
            <p>
              These third-party services may collect their own data according to their respective privacy policies. We encourage you to review their privacy practices if you have concerns. However, please note that none of these services have access to the images you process using our tool, as those never leave your device.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <UserCheck className="h-6 w-6 text-primary" />
              Data Security
            </h2>
            <p>
              Our browser-based architecture provides inherent security advantages that server-based alternatives cannot match. Since your images never leave your device, there's no risk of your image data being:
            </p>
            <ul>
              <li>Intercepted during transmission over the internet</li>
              <li>Stored on servers that could be breached or hacked</li>
              <li>Accessed by unauthorized employees or contractors</li>
              <li>Sold, shared, or leaked to third parties</li>
              <li>Retained beyond their useful purpose</li>
              <li>Subject to government surveillance or legal requests</li>
            </ul>
            <p>
              Your files remain completely under your control at all times, from the moment you select them to the moment you download the resized result. This zero-knowledge architecture means that even if our website were somehow compromised, your images would remain safe on your own device.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <Bell className="h-6 w-6 text-primary" />
              Children's Privacy
            </h2>
            <p>
              Our service is available to users of all ages. Since we don't collect personal information, there are no special provisions for children's data under laws like COPPA (Children's Online Privacy Protection Act). Parents and guardians can feel confident allowing their children to use our tool, knowing that no personal data is being collected or stored.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <FileText className="h-6 w-6 text-primary" />
              Your Rights and Choices
            </h2>
            <p>
              Because we collect minimal data, you have significant control over your privacy experience:
            </p>
            <ul>
              <li><strong>Opt-out of analytics</strong>: You can use browser privacy settings or extensions to block analytics tracking</li>
              <li><strong>Clear local storage</strong>: You can clear your browser's local storage at any time to remove saved preferences</li>
              <li><strong>Disable cookies</strong>: You can configure your browser to reject cookies, though this may affect some functionality</li>
              <li><strong>Use private browsing</strong>: You can use incognito or private browsing mode for additional privacy</li>
            </ul>

            <h2 className="mt-12">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify users of any material changes by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your privacy.
            </p>

            <h2 className="mt-12">Contact Us</h2>
            <p>
              If you have any questions, concerns, or suggestions about this Privacy Policy or our privacy practices, please don't hesitate to reach out. We value your feedback and are committed to addressing any privacy-related inquiries promptly and thoroughly.
            </p>
            <p>
              You can contact us through our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>, and we will respond to your inquiry as quickly as possible. For more information about how our tool works, visit our <Link to="/about" className="text-primary hover:underline">About page</Link> or explore our <Link to="/guides" className="text-primary hover:underline">comprehensive guides</Link> on image optimization.
            </p>
            <p>
              Ready to resize images with complete privacy? <Link to="/" className="text-primary hover:underline">Try our free image resizer</Link> – no signup required.
            </p>
          </div>

          {/* Trust Banner */}
          <div className="mt-12 rounded-2xl gradient-primary p-8 text-center text-primary-foreground">
            <Shield className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Your Privacy Is Our Priority</h3>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto">
              We've built Resizer Lab with a zero-knowledge architecture, meaning your images never leave your device. This isn't just a feature—it's the fundamental principle that guides everything we do.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
