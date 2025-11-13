import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Cheyyar Properties website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use of Services</h2>
                <p className="text-muted-foreground mb-3">
                  Our platform provides real estate listing services. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use the service only for lawful purposes</li>
                  <li>Provide accurate and truthful information</li>
                  <li>Not engage in any fraudulent activities</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Property Listings</h2>
                <p className="text-muted-foreground">
                  We strive to ensure all property information is accurate and up-to-date. However, we do not guarantee the accuracy, completeness, or reliability of any listing. Users are encouraged to verify all information independently before making any decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
                <p className="text-muted-foreground mb-3">
                  As a user of our platform, you are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Conducting your own due diligence on properties</li>
                  <li>Verifying property ownership and legal status</li>
                  <li>Negotiating terms directly with property owners or agents</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Securing proper legal and financial advice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Cheyyar Properties acts as a platform connecting buyers, sellers, and renters. We are not responsible for any transactions, disputes, or issues that may arise between parties. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including text, graphics, logos, images, and software, is the property of Cheyyar Properties or its content suppliers and is protected by copyright laws. Unauthorized use of any content is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Privacy</h2>
                <p className="text-muted-foreground">
                  Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Modifications to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including breach of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms shall be governed by and construed in accordance with the laws of India, specifically the laws applicable in Tamil Nadu, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at info@cheyyarproperties.com
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
