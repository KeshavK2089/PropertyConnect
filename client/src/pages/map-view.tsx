import { useQuery } from "@tanstack/react-query";
import { Property, PropertyFilter } from "@shared/schema";
import { PropertyMap } from "@/components/property-map";
import { PropertyCard } from "@/components/property-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation as useRouterLocation } from "wouter";

export default function MapView() {
  const [, setLocation] = useRouterLocation();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: properties } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    if (typeFilter === "all") return properties;
    return properties.filter((p) => p.type === typeFilter);
  }, [properties, typeFilter]);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handlePropertyClick = (property: Property) => {
    setLocation(`/property/${property.id}`);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      <div className="lg:w-96 flex-shrink-0 border-b lg:border-r lg:border-b-0 bg-background overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">Property Map</h2>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger data-testid="select-map-filter">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="land">Land Plots</SelectItem>
              <SelectItem value="rental">Rental Spaces</SelectItem>
              <SelectItem value="retail">Retail Spaces</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className={`h-7 ${
                typeFilter === "land"
                  ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400"
                  : "bg-green-500/10 text-green-700 dark:text-green-400"
              }`}
              onClick={() => setTypeFilter(typeFilter === "land" ? "all" : "land")}
              data-testid="filter-land"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
              Land
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-7 ${
                typeFilter === "rental"
                  ? "bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400"
                  : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
              }`}
              onClick={() => setTypeFilter(typeFilter === "rental" ? "all" : "rental")}
              data-testid="filter-rental"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
              Rental
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-7 ${
                typeFilter === "retail"
                  ? "bg-purple-500/20 border-purple-500 text-purple-700 dark:text-purple-400"
                  : "bg-purple-500/10 text-purple-700 dark:text-purple-400"
              }`}
              onClick={() => setTypeFilter(typeFilter === "retail" ? "all" : "retail")}
              data-testid="filter-retail"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5" />
              Retail
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} shown
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className={`cursor-pointer hover-elevate active-elevate-2 transition-all ${
                  selectedProperty?.id === property.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handlePropertyClick(property)}
                data-testid={`map-property-card-${property.id}`}
              >
                <div className="flex gap-3 p-3">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{property.title}</h3>
                    <p className="text-base font-bold text-primary mb-1">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(property.price)}
                      {property.priceType === "rent_monthly" && "/mo"}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{property.address}</p>
                    <div className="flex gap-1 mt-2">
                      <Badge className="text-xs" variant="outline">
                        {property.sizeValue} {property.sizeUnit}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 relative">
        <PropertyMap
          properties={filteredProperties}
          onMarkerClick={handleMarkerClick}
          selectedPropertyId={selectedProperty?.id}
          height="h-full"
        />

        {selectedProperty && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
            <Card className="shadow-xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => setSelectedProperty(null)}
                data-testid="button-close-preview"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="p-4">
                <div className="flex gap-3 mb-3">
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 line-clamp-2">{selectedProperty.title}</h3>
                    <p className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(selectedProperty.price)}
                      {selectedProperty.priceType === "rent_monthly" && "/mo"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {selectedProperty.address}
                </p>
                <Button
                  className="w-full"
                  onClick={() => handlePropertyClick(selectedProperty)}
                  data-testid="button-view-details-map"
                >
                  View Details
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
