"use client";

import { useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { LatLngBoundsExpression, Layer, LeafletMouseEvent, PathOptions } from "leaflet";
import type { Feature, FeatureCollection } from "geojson";
import MapController from "./MapController";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import statesData from "../../public/geo/us-states-20m.json";

type DrillLevel = {
  level: "national" | "state" | "county";
  stateFips?: string;
  stateName?: string;
  countyFips?: string;
  countyName?: string;
};

const defaultStyle: PathOptions = {
  fillColor: "#1e3a5f",
  weight: 1,
  opacity: 1,
  color: "#4a90d9",
  fillOpacity: 0.6,
};

const hoverStyle: PathOptions = {
  weight: 2,
  color: "#ff4444",
  fillColor: "#2a4a7f",
  fillOpacity: 0.8,
};

const US_BOUNDS: LatLngBoundsExpression = [
  [24.396308, -125.0],
  [49.384358, -66.93457],
];

export default function DrillDownMap() {
  const [drillLevel, setDrillLevel] = useState<DrillLevel>({ level: "national" });
  const [countyData, setCountyData] = useState<FeatureCollection | null>(null);
  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCountyData = useCallback(async (stateFips: string) => {
    setLoading(true);
    try {
      const resp = await fetch(`/geo/counties/${stateFips}.json`);
      if (resp.ok) {
        const data: FeatureCollection = await resp.json();
        setCountyData(data);
      }
    } catch (err) {
      console.error("Failed to load county data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onEachState = useCallback(
    (feature: Feature, layer: Layer) => {
      const name = feature.properties?.NAME || "Unknown";
      layer.bindTooltip(name, { sticky: true, className: "map-tooltip" });

      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          e.target.setStyle(hoverStyle);
          e.target.bringToFront();
        },
        mouseout: (e: LeafletMouseEvent) => {
          e.target.setStyle(defaultStyle);
        },
        click: async (e: LeafletMouseEvent) => {
          const stateFips = feature.properties?.STATE;
          const stateName = feature.properties?.NAME;
          setBounds(e.target.getBounds());
          setDrillLevel({ level: "state", stateFips, stateName });
          await loadCountyData(stateFips);
        },
      });
    },
    [loadCountyData]
  );

  const onEachCounty = useCallback((feature: Feature, layer: Layer) => {
    const name = feature.properties?.NAME || "Unknown County";
    layer.bindTooltip(name, { sticky: true });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        e.target.setStyle(hoverStyle);
        e.target.bringToFront();
      },
      mouseout: (e: LeafletMouseEvent) => {
        e.target.setStyle(defaultStyle);
      },
      click: () => {
        const countyName = feature.properties?.NAME;
        const stateName = drillLevel.stateName;
        window.location.href = `/${stateName?.toLowerCase().replace(/\s+/g, "-")}/${countyName?.toLowerCase().replace(/\s+/g, "-")}`;
      },
    });
  }, [drillLevel]);

  const handleBack = useCallback(() => {
    if (drillLevel.level === "state") {
      setCountyData(null);
      setDrillLevel({ level: "national" });
      setBounds(US_BOUNDS);
    }
  }, [drillLevel]);

  const breadcrumbParts = ["US"];
  if (drillLevel.stateName) breadcrumbParts.push(drillLevel.stateName);
  if (drillLevel.countyName) breadcrumbParts.push(drillLevel.countyName);

  return (
    <div className="relative h-full w-full">
      {/* Breadcrumb */}
      <div className="absolute top-4 left-16 z-[1000] bg-gray-900/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 text-sm">
        {drillLevel.level !== "national" && (
          <button onClick={handleBack} className="text-red-400 hover:text-red-300 font-semibold">
            &larr; Back
          </button>
        )}
        <span className="text-gray-300">{breadcrumbParts.join(" > ")}</span>
        {loading && <span className="text-yellow-400 animate-pulse">Loading...</span>}
      </div>

      <MapContainer
        bounds={US_BOUNDS}
        className="h-full w-full"
        scrollWheelZoom={true}
        zoomSnap={0.5}
        minZoom={3}
        maxZoom={18}
        preferCanvas={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapController bounds={bounds} />

        {drillLevel.level === "national" && (
          <GeoJSON
            key="states"
            data={statesData as unknown as FeatureCollection}
            style={defaultStyle}
            onEachFeature={onEachState}
          />
        )}

        {drillLevel.level === "state" && countyData && (
          <GeoJSON
            key={`counties-${drillLevel.stateFips}`}
            data={countyData}
            style={defaultStyle}
            onEachFeature={onEachCounty}
          />
        )}
      </MapContainer>
    </div>
  );
}
