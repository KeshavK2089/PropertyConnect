import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Your trusted partner for quality real estate in Cheyyar, Tamil Nadu
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cheyyar Properties was founded with a simple mission: to help people find their perfect property in Cheyyar and surrounding areas. We understand that finding the right land, home, or commercial space is one of life's most important decisions.
              </p>
              <p>
                With years of experience in the local real estate market, we've built strong relationships with property owners and buyers alike. Our deep knowledge of Cheyyar's neighborhoods, market trends, and development opportunities sets us apart.
              </p>
              <p>
                Whether you're looking for agricultural land for farming, a comfortable rental home for your family, or retail space for your business, we're here to guide you every step of the way.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-2">500+</p>
                <p className="text-sm text-muted-foreground">Properties Listed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-2">1000+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-2">10+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-2">98%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in honest, clear communication. All property details, pricing, and terms are presented transparently.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                <p className="text-muted-foreground">
                  Our deep understanding of Cheyyar's real estate market helps you make informed decisions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We go the extra mile to ensure you find exactly what you're looking for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Comprehensive Listings</h3>
                <p className="text-sm text-muted-foreground">
                  From agricultural land to commercial spaces, we offer a wide range of properties to suit every need and budget.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Verified Properties</h3>
                <p className="text-sm text-muted-foreground">
                  All listings are thoroughly verified for authenticity and legal compliance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Our experienced team provides professional advice throughout your property journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Easy Process</h3>
                <p className="text-sm text-muted-foreground">
                  We streamline the buying, selling, and renting process to make it as simple as possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Property?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let us help you discover the perfect land, home, or commercial space in Cheyyar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/listings">
              <Button size="lg">Browse Properties</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
