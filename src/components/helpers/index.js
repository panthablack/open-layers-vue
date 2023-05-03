import DragAndDrop from 'ol/interaction/DragAndDrop'
import Draw from 'ol/interaction/Draw'
import GeoJSON from 'ol/format/GeoJSON'
import Modify from 'ol/interaction/Modify'
import Snap from 'ol/interaction/Snap'

export const activateDragAndDrop = (map, source) =>
  map.addInteraction(new DragAndDrop({ source, formatConstructors: [GeoJSON] }))

export const activateDraw = (map, source) =>
  map.addInteraction(new Draw({ type: 'Polygon', source }))

export const activateModify = (map, source) => map.addInteraction(new Modify({ source }))

export const activateSnap = (map, source) => map.addInteraction(new Snap({ source }))
