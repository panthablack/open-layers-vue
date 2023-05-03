<script setup>
import { onMounted } from 'vue'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import MapboxVectorLayer from 'ol/layer/MapboxVector'

onMounted(() => {
  const map = new Map({
    target: 'map',
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  })
  const tileLayer = new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url:
        'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
        'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
      maxZoom: 14,
    }),
  })
  const vectorLayer = new MapboxVectorLayer({
    styleUrl: 'https://api.maptiler.com/maps/bright/style.json?key=lirfd6Fegsjkvs0lshxe',
  })
  map.addLayer(tileLayer)
  map.addLayer(vectorLayer)
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
