import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { PropertyCard } from "@/components/property-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const { data: properties } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  useEffect(() => {
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoriteIds(favorites);
    };

    loadFavorites();

    const handleFavoritesChanged = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesChanged", handleFavoritesChanged);
    return () => window.removeEventListener("favoritesChanged", handleFavoritesChanged);
  }, []);

  const favoriteProperties = properties?.filter((p) => favoriteIds.includes(p.id)) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Favorite Properties</h1>
          </div>
          <p className="text-muted-foreground">
            Properties you've saved for later
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteProperties.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start adding properties to your favorites to see them here
            </p>
            <Link href="/listings">
              <Button data-testid="button-browse-properties">Browse Properties</Button>
            </Link>
          </Card>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {favoriteProperties.length} {favoriteProperties.length === 1 ? "property" : "properties"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
