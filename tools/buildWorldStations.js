#!/usr/bin/env node

/*
Rebuilds public/data/worldStations.json, the index of non-US tide stations.

The data comes from the Neaps tide database
(https://github.com/neaps/tide-database), which republishes the TICON-4
dataset of tidal harmonic constituents derived from GESLA-4 sea level
records. Individual station files are served to the app at runtime from
the jsDelivr CDN; this script only extracts the id/lat/lng index needed
to place markers on the map.

Usage: node tools/buildWorldStations.js
*/

const fs = require('fs')
const path = require('path')

const constituentSpeeds = require('../src/constituentSpeeds.json')

const LIST_URL = 'https://data.jsdelivr.com/v1/packages/gh/neaps/tide-database@main?structure=flat'
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/neaps/tide-database@main'
const OUTPUT = path.join(__dirname, '..', 'public', 'data', 'worldStations.json')
const CONCURRENCY = 24

// NOAA already provides these stations; skip them to avoid duplicate markers.
const EXCLUDED_COUNTRIES = new Set(['United States'])

const fetchJson = async (url, attempts = 4) => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url)
      if (!response.ok) { throw new Error(`HTTP ${response.status}`) }
      return await response.json()
    } catch (error) {
      if (attempt === attempts) { throw new Error(`${url}: ${error.message}`) }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
    }
  }
}

const main = async () => {
  const listing = await fetchJson(LIST_URL)
  const ticonFiles = listing.files
    .map((file) => file.name)
    .filter((name) => name.startsWith('/data/ticon/') && name.endsWith('.json'))
  console.log(`${ticonFiles.length} TICON station files listed`)

  const stations = []
  const unknownConstituents = new Map()
  let cursor = 0

  const worker = async () => {
    while (cursor < ticonFiles.length) {
      const file = ticonFiles[cursor++]
      const station = await fetchJson(CDN_BASE + file)
      if (station.type !== 'reference') { continue }
      if (EXCLUDED_COUNTRIES.has(station.country)) { continue }
      const constituents = station.harmonic_constituents || []
      if (!constituents.some((c) => c.amplitude > 0)) { continue }
      constituents.forEach((c) => {
        const name = c.name.toUpperCase()
        if (c.amplitude > 0 && !(name in constituentSpeeds)) {
          unknownConstituents.set(name, (unknownConstituents.get(name) || 0) + 1)
        }
      })
      stations.push({
        id: station.source.id,
        lat: Number(station.latitude.toFixed(4)),
        lng: Number(station.longitude.toFixed(4)),
      })
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  stations.sort((a, b) => a.lng - b.lng)
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify(stations))
  console.log(`wrote ${stations.length} stations to ${OUTPUT}`)

  if (unknownConstituents.size) {
    console.log('constituent names without a speed in src/constituentSpeeds.json (they will be skipped at runtime):')
    const sorted = [...unknownConstituents.entries()].sort((a, b) => b[1] - a[1])
    sorted.forEach(([name, count]) => console.log(`  ${name}: ${count} stations`))
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
