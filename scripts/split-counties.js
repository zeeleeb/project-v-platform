const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "..", "public", "geo", "us-counties-5m.json");
const outDir = path.join(__dirname, "..", "public", "geo", "counties");

console.log("Loading counties...");
const allCounties = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

const byState = {};
for (const feature of allCounties.features) {
  const state = feature.properties.STATE || feature.properties.STATEFP;
  if (!state) continue;
  if (!byState[state]) byState[state] = [];
  byState[state].push(feature);
}

fs.mkdirSync(outDir, { recursive: true });

for (const [fips, features] of Object.entries(byState)) {
  const collection = { type: "FeatureCollection", features };
  const json = JSON.stringify(collection);
  fs.writeFileSync(path.join(outDir, `${fips}.json`), json);
  console.log(`  ${fips}: ${features.length} counties, ${(json.length / 1024).toFixed(1)} KB`);
}

console.log(`\nSplit ${allCounties.features.length} counties into ${Object.keys(byState).length} state files`);
