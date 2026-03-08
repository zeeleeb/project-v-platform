"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";
import type { LatLngBoundsExpression } from "leaflet";

export default function MapController({ bounds }: { bounds: LatLngBoundsExpression | null }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 12, animate: true });
    }
  }, [bounds, map]);

  return null;
}
