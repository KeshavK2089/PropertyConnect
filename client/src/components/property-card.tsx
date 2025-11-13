import { Property } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize2, Heart } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  property: Property;
  view?: "grid" | "list";
}

export function PropertyCard({ property, view = "grid" }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isNew = new Date().getTime() - new Date(property.dateListed).getTime() < 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updated = favorites.filter((id: string) => id !== property.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(property.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "pending": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "sold": return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "land": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "rental": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "retail": return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const formatPrice = (price: number, priceType: string) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
    return priceType === "rent_monthly" ? `${formatted}/mo` : formatted;
  };

  if (view === "list") {
    return (
      <Link href={`/property/${property.id}`}>
        <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-80 h-56 md:h-auto flex-shrink-0">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isNew && (
                <Badge className="absolute top-3 left-3">New</Badge>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-3 right-3"
                onClick={toggleFavorite}
                data-testid={`button-favorite-${property.id}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
              </Button>
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2" data-testid={`text-title-${property.id}`}>
                    {property.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getTypeColor(property.type)}>
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(property.status)}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary" data-testid={`text-price-${property.id}`}>
                  {formatPrice(property.price, property.priceType)}
                </p>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2">
                {property.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span data-testid={`text-location-${property.id}`}>{property.address}, {property.city}</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {property.sizeValue} {property.sizeUnit}
                  </span>
                </div>
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.bedrooms} Beds</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{property.bathrooms} Baths</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {property.features.slice(0, 4).map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/property/${property.id}`}>
      <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer h-full flex flex-col">
        <div className="relative h-56">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isNew && (
            <Badge className="absolute top-3 left-3">New</Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3"
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            data-testid={`button-favorite-${property.id}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
          </Button>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge className={getTypeColor(property.type)}>
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2" data-testid={`text-title-${property.id}`}>
              {property.title}
            </h3>
            <p className="text-2xl font-bold text-primary mb-3" data-testid={`text-price-${property.id}`}>
              {formatPrice(property.price, property.priceType)}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1" data-testid={`text-location-${property.id}`}>{property.address}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {property.sizeValue} {property.sizeUnit}
                </span>
              </div>
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {property.features.slice(0, 3).map((feature, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full mt-auto" data-testid={`button-view-${property.id}`}>
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
