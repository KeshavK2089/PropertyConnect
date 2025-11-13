import { PropertyFilter } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PropertyFiltersProps {
  filters: PropertyFilter;
  onFilterChange: (filters: PropertyFilter) => void;
  propertyCount: number;
}

export function PropertyFilters({ filters, onFilterChange, propertyCount }: PropertyFiltersProps) {
  const updateFilter = (key: keyof PropertyFilter, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select
            value={filters.type || "all"}
            onValueChange={(value) => updateFilter("type", value === "all" ? undefined : value as any)}
          >
            <SelectTrigger id="property-type" data-testid="select-property-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="rental">Rental</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) => updateFilter("status", value === "all" ? undefined : value as any)}
          >
            <SelectTrigger id="status" data-testid="select-status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min Price</Label>
              <Input
                id="min-price"
                type="number"
                placeholder="₹0"
                value={filters.minPrice || ""}
                onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                data-testid="input-min-price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max Price</Label>
              <Input
                id="max-price"
                type="number"
                placeholder="₹Any"
                value={filters.maxPrice || ""}
                onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                data-testid="input-max-price"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Size Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="min-size" className="text-xs text-muted-foreground">Min Size</Label>
              <Input
                id="min-size"
                type="number"
                placeholder="0"
                value={filters.minSize || ""}
                onChange={(e) => updateFilter("minSize", e.target.value ? Number(e.target.value) : undefined)}
                data-testid="input-min-size"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-size" className="text-xs text-muted-foreground">Max Size</Label>
              <Input
                id="max-size"
                type="number"
                placeholder="Any"
                value={filters.maxSize || ""}
                onChange={(e) => updateFilter("maxSize", e.target.value ? Number(e.target.value) : undefined)}
                data-testid="input-max-size"
              />
            </div>
          </div>
        </div>

        {(filters.type === "rental" || !filters.type) && (
          <>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={filters.bedrooms?.toString() || "any"}
                onValueChange={(value) => updateFilter("bedrooms", value === "any" ? undefined : Number(value))}
              >
                <SelectTrigger id="bedrooms" data-testid="select-bedrooms">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select
                value={filters.bathrooms?.toString() || "any"}
                onValueChange={(value) => updateFilter("bathrooms", value === "any" ? undefined : Number(value))}
              >
                <SelectTrigger id="bathrooms" data-testid="select-bathrooms">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={filters.sortBy || "date-desc"}
            onValueChange={(value) => updateFilter("sortBy", value as any)}
          >
            <SelectTrigger id="sort" data-testid="select-sort">
              <SelectValue placeholder="Newest First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="size-asc">Size: Small to Large</SelectItem>
              <SelectItem value="size-desc">Size: Large to Small</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {propertyCount} {propertyCount === 1 ? "property" : "properties"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
