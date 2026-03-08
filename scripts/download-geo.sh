#!/bin/bash
# Download GeoJSON boundary data for Project V
cd "$(dirname "$0")/../public/geo"

# US States (20m resolution, ~200KB)
echo "Downloading US states GeoJSON..."
curl -L -o us-states-20m.json "https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_20m.json"

# US Counties (5m resolution, ~2.5MB -- will be split by state)
echo "Downloading US counties GeoJSON..."
curl -L -o us-counties-5m.json "https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_5m.json"

echo "Downloaded state and county GeoJSON"
ls -la *.json
