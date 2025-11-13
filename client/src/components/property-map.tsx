import { useEffect, useRef } from "react";
import L from "leaflet";
import { Property } from "@shared/schema";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (property: Property) => void;
  selectedPropertyId?: string;
  height?: string;
}

export function PropertyMap({
  properties,
  center = [12.66, 79.54],
  zoom = 12,
  onMarkerClick,
  selectedPropertyId,
  height = "h-96"
}: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const getMarkerIcon = (type: string, isSelected: boolean) => {
      const colors = {
        land: isSelected ? "#15803d" : "#22c55e",
        rental: isSelected ? "#1e40af" : "#3b82f6",
        retail: isSelected ? "#7e22ce" : "#a855f7"
      };

      return L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            background: ${colors[type as keyof typeof colors] || "#6b7280"};
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: white;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
    };

    properties.forEach(property => {
      const isSelected = property.id === selectedPropertyId;
      const marker = L.marker([property.latitude, property.longitude], {
        icon: getMarkerIcon(property.type, isSelected)
      }).addTo(mapRef.current!);

      const formatPrice = (price: number, priceType: string) => {
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price);
        return priceType === "rent_monthly" ? `${formatted}/mo` : formatted;
      };

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">${property.title}</h3>
          <p style="font-weight: 700; color: #22c55e; margin-bottom: 6px; font-size: 16px;">${formatPrice(property.price, property.priceType)}</p>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${property.address}</p>
          <p style="font-size: 12px; color: #666;">${property.sizeValue} ${property.sizeUnit}</p>
        </div>
      `;

      marker.bindPopup(popupContent);

      if (onMarkerClick) {
        marker.on("click", () => {
          onMarkerClick(property);
        });
      }

      markersRef.current.push(marker);
    });

    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [properties, selectedPropertyId, onMarkerClick]);

  return <div ref={mapContainerRef} className={`w-full ${height} rounded-lg`} data-testid="map-container" />;
}
