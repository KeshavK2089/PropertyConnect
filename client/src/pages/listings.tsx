import { useQuery } from "@tanstack/react-query";
import { Property, PropertyFilter } from "@shared/schema";
import { PropertyCard } from "@/components/property-card";
import { PropertyFilters } from "@/components/property-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Grid3X3, List, Filter } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";

export default function Listings() {
  const [location] = useLocation();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PropertyFilter>({});

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const newFilters: PropertyFilter = {};

    const type = params.get("type");
    if (type === "land" || type === "rental" || type === "retail") {
      newFilters.type = type;
    }

    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
      newFilters.search = search;
    }

    setFilters(newFilters);
  }, [location]);

  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    let filtered = [...properties];

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.minSize !== undefined) {
      filtered = filtered.filter(p => p.sizeValue >= filters.minSize!);
    }

    if (filters.maxSize !== undefined) {
      filtered = filtered.filter(p => p.sizeValue <= filters.maxSize!);
    }

    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(p => p.bedrooms && p.bedrooms >= filters.bedrooms!);
    }

    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter(p => p.bathrooms && p.bathrooms >= filters.bathrooms!);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "size-asc":
          filtered.sort((a, b) => a.sizeValue - b.sizeValue);
          break;
        case "size-desc":
          filtered.sort((a, b) => b.sizeValue - a.sizeValue);
          break;
        case "date-asc":
          filtered.sort((a, b) => new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime());
          break;
        case "date-desc":
          filtered.sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime());
          break;
      }
    } else {
      filtered.sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime());
    }

    return filtered;
  }, [properties, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchQuery || undefined });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Property Listings</h1>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-listings"
              />
            </div>
            <Button type="submit" data-testid="button-search-listings">
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <div className="hidden lg:block sticky top-24">
              <PropertyFilters
                filters={filters}
                onFilterChange={setFilters}
                propertyCount={filteredProperties.length}
              />
            </div>

            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2" data-testid="button-filters-mobile">
                    <Filter className="h-4 w-4" />
                    Filters ({Object.keys(filters).length})
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                  <PropertyFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    propertyCount={filteredProperties.length}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("grid")}
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("list")}
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isLoading && (
              <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            )}

            {!isLoading && filteredProperties.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-lg font-medium mb-2">No properties found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={() => setFilters({})} data-testid="button-clear-all">
                  Clear All Filters
                </Button>
              </Card>
            )}

            {!isLoading && filteredProperties.length > 0 && (
              <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
