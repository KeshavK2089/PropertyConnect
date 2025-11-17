import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCard } from "@/components/property-card";
import { Search, TrendingUp, Building2, Home as HomeIcon, Store, MapPin, Phone, Mail, PlusCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroImage from "@assets/generated_images/Cheyyar_hero_landscape_panorama_35d5b4a5.png";
import landImage from "@assets/generated_images/Agricultural_land_plot_864c3a06.png";
import rentalImage from "@assets/generated_images/Rental_house_exterior_27cfd0fa.png";
import retailImage from "@assets/generated_images/Retail_space_storefront_c915fe5f.png";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: featuredProperties } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setLocation("/listings");
    }
  };

  const stats = properties ? {
    total: properties.length,
    landAvg: Math.round(properties.filter(p => p.type === "land").reduce((sum, p) => sum + p.price, 0) / properties.filter(p => p.type === "land").length || 0),
    rentalAvg: Math.round(properties.filter(p => p.type === "rental").reduce((sum, p) => sum + p.price, 0) / properties.filter(p => p.type === "rental").length || 0),
    available: properties.filter(p => p.status === "available").length,
  } : null;

  const propertyCounts = properties ? {
    land: properties.filter(p => p.type === "land").length,
    rental: properties.filter(p => p.type === "rental").length,
    retail: properties.filter(p => p.type === "retail").length,
  } : null;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[500px] sm:h-[600px] lg:h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Cheyyar landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            Find Your Perfect Property in Cheyyar
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/95 drop-shadow-lg max-w-2xl mx-auto">
            Discover quality land plots, rental homes, and retail spaces
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 backdrop-blur-md bg-white/10 p-3 sm:p-2 rounded-xl shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by location, property type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-0 h-12 sm:h-14 text-base shadow-sm"
                  data-testid="input-search-hero"
                />
              </div>
              <Button type="submit" size="lg" className="px-8 h-12 sm:h-14 text-base font-semibold" data-testid="button-search-hero">
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            <Link href="/listings?type=land">
              <Button variant="outline" className="backdrop-blur-md bg-white/10 border-white/40 text-white hover:bg-white/20 text-sm sm:text-base">
                Land Plots
              </Button>
            </Link>
            <Link href="/listings?type=rental">
              <Button variant="outline" className="backdrop-blur-md bg-white/10 border-white/40 text-white hover:bg-white/20 text-sm sm:text-base">
                Rental Spaces
              </Button>
            </Link>
            <Link href="/listings?type=retail">
              <Button variant="outline" className="backdrop-blur-md bg-white/10 border-white/40 text-white hover:bg-white/20 text-sm sm:text-base">
                Retail Spaces
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Link href="/listings?type=land">
              <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer h-full">
                <div className="relative h-64">
                  <img src={landImage} alt="Land plots" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-6 w-6" />
                      <h3 className="text-2xl font-bold">Land Plots</h3>
                    </div>
                    {propertyCounts && (
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                        {propertyCounts.land} Available
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Prime agricultural and residential land plots ready for development
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/listings?type=rental">
              <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer h-full">
                <div className="relative h-64">
                  <img src={rentalImage} alt="Rental spaces" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <HomeIcon className="h-6 w-6" />
                      <h3 className="text-2xl font-bold">Rental Spaces</h3>
                    </div>
                    {propertyCounts && (
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                        {propertyCounts.rental} Available
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Comfortable homes and apartments for rent in prime locations
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/listings?type=retail">
              <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer h-full">
                <div className="relative h-64">
                  <img src={retailImage} alt="Retail spaces" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Store className="h-6 w-6" />
                      <h3 className="text-2xl font-bold">Retail Spaces</h3>
                    </div>
                    {propertyCounts && (
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                        {propertyCounts.retail} Available
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Commercial spaces perfect for shops, offices, and businesses
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {stats && (
        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Properties</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold mb-2">
                    ₹{(stats.landAvg / 100000).toFixed(1)}L
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Land Price</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <HomeIcon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold mb-2">
                    ₹{(stats.rentalAvg / 1000).toFixed(0)}k
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Monthly Rent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Store className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stats.available}</p>
                  <p className="text-sm text-muted-foreground">Available Now</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {featuredProperties && featuredProperties.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Properties</h2>
                <p className="text-muted-foreground">Handpicked properties you might like</p>
              </div>
              <Link href="/listings">
                <Button variant="outline" data-testid="button-view-all">
                  View All
                </Button>
              </Link>
            </div>

            <div className="relative px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {featuredProperties.map((property) => (
                    <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
                      <PropertyCard property={property} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {isLoading && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-56 w-full" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <PlusCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">List Your Property</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have a property to sell or rent? We can help you reach potential buyers and tenants in Cheyyar
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Speak with our listing specialists
                    </p>
                    <a 
                      href="tel:+919876543210" 
                      className="text-lg font-bold text-primary hover:underline"
                      data-testid="link-seller-phone"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Send us your property details
                    </p>
                    <a 
                      href="mailto:listings@cheyyarproperties.com" 
                      className="text-lg font-bold text-primary hover:underline break-all"
                      data-testid="link-seller-email"
                    >
                      listings@cheyyarproperties.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong>What to include:</strong> Property type, location, size, price expectations, 
                  contact details, and any photos. Our team will review and contact you within 24-48 hours.
                </p>
              </div>

              <Link href="/contact">
                <Button size="lg" className="w-full gap-2" data-testid="button-list-property">
                  <Phone className="h-5 w-5" />
                  Contact Us to List Your Property
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Property?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our collection of quality properties in Cheyyar
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/listings">
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Browse All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
