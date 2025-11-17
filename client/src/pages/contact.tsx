import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail, PlusCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions about our properties? Get in touch with us directly
          </p>
        </div>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <PlusCircle className="h-6 w-6 text-primary" />
              Want to List Your Property?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Are you a property owner looking to sell or rent out your land, home, or commercial space in Cheyyar? 
              We can help you reach serious buyers and tenants. Contact us using the information below to get started.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-3 bg-background p-4 rounded-lg">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Call Our Listing Team</p>
                  <a 
                    href="tel:+919876543210" 
                    className="text-primary hover:underline font-semibold"
                    data-testid="link-listing-phone"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-background p-4 rounded-lg">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Email Property Details</p>
                  <a 
                    href="mailto:listings@cheyyarproperties.com" 
                    className="text-primary hover:underline font-semibold text-sm break-all"
                    data-testid="link-listing-email"
                  >
                    listings@cheyyarproperties.com
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Information to provide:</strong> Property type, exact location and address, 
                size/dimensions, asking price or rent, key features, your contact details, and photos if available. 
                We'll get back to you within 1-2 business days.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Call Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Speak directly with our property specialists
              </p>
              <a 
                href="tel:+919876543210" 
                className="text-2xl font-bold text-primary hover:underline block mb-3"
                data-testid="contact-phone"
              >
                +91 98765 43210
              </a>
              <Button 
                className="w-full" 
                asChild
                data-testid="button-call-now"
              >
                <a href="tel:+919876543210">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Our Office
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2 font-semibold">Cheyyar Properties</p>
            <p className="text-muted-foreground mb-4">
              123 Main Road, Gandhi Nagar<br />
              Cheyyar, Tamil Nadu 604407<br />
              India
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Note:</strong> We currently operate by phone consultation only. 
                Please call us during business hours to discuss your property needs. 
                Our experienced team is ready to help you find the perfect property in Cheyyar.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Looking for a Specific Property?</h3>
              <p className="text-muted-foreground mb-4">
                Browse our complete listings of land plots, rental spaces, and retail properties. 
                When you find something you like, use the contact information on the property page to reach the owner directly.
              </p>
              <Button asChild data-testid="button-browse-listings">
                <a href="/listings">Browse All Properties</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
