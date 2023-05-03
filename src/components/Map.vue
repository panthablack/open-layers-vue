<script setup>
import { onMounted, ref } from 'vue'
import { Map } from 'ol'
import { worldBasic as config } from './helpers/maps'
import Link from 'ol/interaction/Link'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { activateDragAndDrop, activateDraw, activateModify, activateSnap } from './helpers/index'

const map = ref(null)
const allowDragAndDrop = ref(true)
const allowDraw = ref(false)
const allowSnap = ref(false)
const allowModify = ref(true)
const source = ref(new VectorSource())
const layer = ref(
  new VectorLayer({
    source: source.value,
  })
)

onMounted(() => {
  map.value = new Map(config)
  map.value.addInteraction(new Link())
  map.value.addLayer(layer.value)
  if (allowDragAndDrop.value) activateDragAndDrop(map.value, source.value)
  if (allowModify.value) activateModify(map.value, source.value)
  if (allowDraw.value) activateDraw(map.value, source.value)
  if (allowSnap.value) activateSnap(map.value, source.value)
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
