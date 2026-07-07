import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import { points } from '../data'

const colors = { flight: '#287ea1', drive: '#356b52', transit: '#687a82' }

function modeForRoute(route) {
  if (route.some((key) => ['HKG', 'YVR', 'YYC', 'SEA'].includes(key)) && route.length <= 4) return 'flight'
  if (route.some((key) => ['Pike', 'Stanley', 'Granville'].includes(key))) return 'transit'
  return 'drive'
}

function makeRoute(route, overview) {
  if (!overview) {
    return route.map((key) => points[key]?.coord).filter(Boolean)
  }
  return [
    points.YVR.coord,
    points.YYC.coord,
    points.Canmore.coord,
    points.Banff.coord,
    points.Louise.coord,
    points.Icefield.coord,
    points.Jasper.coord,
    points.YYC.coord,
    points.YVR.coord,
    points.SEA.coord,
  ]
}

export default function MapPanel({ route = [], overview = false, compact = false }) {
  const nodeRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!nodeRef.current) return undefined
    const coords = makeRoute(route, overview)
    const map = new maplibregl.Map({
      container: nodeRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: coords[0] || [-116.3, 51.7],
      zoom: overview ? 3.5 : 8,
      attributionControl: false,
    })
    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right')

    map.on('load', () => {
      if (coords.length > 1) {
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords } },
        })
        map.addLayer({
          id: 'route-shadow', type: 'line', source: 'route',
          paint: { 'line-color': '#ffffff', 'line-width': 8, 'line-opacity': 0.82 },
        })
        map.addLayer({
          id: 'route-line', type: 'line', source: 'route',
          paint: {
            'line-color': colors[overview ? 'drive' : modeForRoute(route)],
            'line-width': 4,
            'line-opacity': 0.9,
            'line-dasharray': modeForRoute(route) === 'flight' ? [2, 2] : [1, 0],
          },
        })
      }

      const bounds = new maplibregl.LngLatBounds()
      const keys = overview ? ['YVR', 'YYC', 'Banff', 'Louise', 'Jasper', 'SEA'] : route
      keys.forEach((key, index) => {
        const point = points[key]
        if (!point) return
        bounds.extend(point.coord)
        const marker = document.createElement('button')
        marker.className = `map-marker ${index === 0 ? 'start' : ''}`
        marker.type = 'button'
        marker.setAttribute('aria-label', point.name)
        marker.textContent = index + 1
        new maplibregl.Marker({ element: marker, anchor: 'bottom' })
          .setLngLat(point.coord)
          .setPopup(new maplibregl.Popup({ offset: 20 }).setHTML(`<strong>${point.name}</strong><br><span>点击地图可继续查看路线</span>`))
          .addTo(map)
      })
      if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: compact ? 36 : 58, maxZoom: 10, duration: 0 })
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [route, overview, compact])

  return <div className={`map-canvas ${compact ? 'compact' : ''}`} ref={nodeRef} aria-label="交互式路线地图" />
}
