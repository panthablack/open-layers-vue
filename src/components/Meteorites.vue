<script setup>
import { onMounted } from 'vue'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { Map, View } from 'ol'
import { Stamen, Vector as VectorSource } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import WebGLPointsLayer from 'ol/layer/WebGLPoints'

onMounted(() => {
  const source = new VectorSource()

  const client = new XMLHttpRequest()
  client.open('GET', '/data/meteorites.csv')
  client.onload = function () {
    const csv = client.responseText
    const features = []

    let prevIndex = csv.indexOf('\n') + 1 // scan past the header line

    let curIndex
    while ((curIndex = csv.indexOf('\n', prevIndex)) != -1) {
      const line = csv.substr(prevIndex, curIndex - prevIndex).split(',')
      prevIndex = curIndex + 1

      const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])])
      if (isNaN(coords[0]) || isNaN(coords[1])) {
        // guard against bad data
        continue
      }

      features.push(
        new Feature({
          mass: parseFloat(line[1]) || 0,
          year: parseInt(line[2]) || 0,
          geometry: new Point(coords),
        })
      )
    }
    source.addFeatures(features)
  }
  client.send()

  const meteoritesVectorLayer = new VectorLayer({
    source: source,
  })

  const meteoritesWebGLPointsLayer = new WebGLPointsLayer({
    source: source,
    style: {
      symbol: {
        symbolType: 'circle',
        size: 14,
        color: 'rgb(255, 0, 0)',
        opacity: 0.5,
      },
    },
  })

  new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new Stamen({
          layer: 'toner',
        }),
      }),
      meteoritesVectorLayer,
      meteoritesWebGLPointsLayer,
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  })
})
</script>

<template>
  <div class="mapContainer">
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map,
.mapContainer {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
  background-color: #04041b;
}
</style>
