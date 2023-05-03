<script setup>
import { onMounted } from 'vue'
import GeoJSON from 'ol/format/GeoJSON.js'
import Map from 'ol/Map.js'
import Select from 'ol/interaction/Select.js'
import VectorLayer from 'ol/layer/Vector.js'
import VectorSource from 'ol/source/Vector.js'
import View from 'ol/View.js'
import { Fill, Stroke, Style } from 'ol/style.js'
import { altKeyOnly, click, pointerMove } from 'ol/events/condition.js'

onMounted(() => {
  const style = new Style({
    fill: new Fill({
      color: '#eeeeee',
    }),
  })

  const vector = new VectorLayer({
    source: new VectorSource({
      url: 'https://openlayers.org/data/vector/ecoregions.json',
      format: new GeoJSON(),
    }),
    background: 'white',
    style: function (feature) {
      const color = feature.get('COLOR') || '#eeeeee'
      style.getFill().setColor(color)
      return style
    },
  })

  const map = new Map({
    layers: [vector],
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  })

  let select = null // ref to currently selected interaction

  const selected = new Style({
    fill: new Fill({
      color: '#eeeeee',
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 2,
    }),
  })

  function selectStyle(feature) {
    const color = feature.get('COLOR') || '#eeeeee'
    selected.getFill().setColor(color)
    return selected
  }

  // select interaction working on "singleclick"
  const selectSingleClick = new Select({ style: selectStyle })

  // select interaction working on "click"
  const selectClick = new Select({
    condition: click,
    style: selectStyle,
  })

  // select interaction working on "pointermove"
  const selectPointerMove = new Select({
    condition: pointerMove,
    style: selectStyle,
  })

  const selectAltClick = new Select({
    style: selectStyle,
    condition: function (mapBrowserEvent) {
      return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent)
    },
  })

  const selectElement = document.getElementById('type')

  const changeInteraction = function () {
    if (select !== null) {
      map.removeInteraction(select)
    }
    const value = selectElement.value
    if (value == 'singleclick') {
      select = selectSingleClick
    } else if (value == 'click') {
      select = selectClick
    } else if (value == 'pointermove') {
      select = selectPointerMove
    } else if (value == 'altclick') {
      select = selectAltClick
    } else {
      select = null
    }
    if (select !== null) {
      map.addInteraction(select)
      select.on('select', function (e) {
        document.getElementById('status').innerHTML =
          '&nbsp;' +
          e.target.getFeatures().getLength() +
          ' selected features (last operation selected ' +
          e.selected.length +
          ' and deselected ' +
          e.deselected.length +
          ' features)'
      })
    }
  }

  /**
   * onchange callback on the select element.
   */
  selectElement.onchange = changeInteraction
  changeInteraction()
})
</script>

<template>
  <div class="mapContainer">
    <form>
      <label for="type">Action type &nbsp;</label>
      <select id="type">
        <option value="click" selected>Click</option>
        <option value="singleclick">Single-click</option>
        <option value="pointermove">Hover</option>
        <option value="altclick">Alt+Click</option>
        <option value="none">None</option>
      </select>
      <span id="status">&nbsp;0 selected features</span>
    </form>
    <div id="map" class="map"></div>
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
