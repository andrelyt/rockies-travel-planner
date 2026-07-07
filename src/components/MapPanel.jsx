import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import { points } from '../data'

const colors = { flight: '#287ea1', drive: '#356b52', transit: '#687a82' }

const airportKeys = ['HKG', 'YVR', 'YYC', 'SEA']

function modeForRoute(route) {
  // 只有当路由中包含至少两个机场点时才视为飞行段，
  // 否则像 Day 6（Jasper → Louise → Canmore → YYC，仅终点是机场）
  // 这种长途自驾会被误判成 flight，绘制成蓝色虚线。
  const airportCount = route.filter((key) => airportKeys.includes(key)).length
  if (airportCount >= 2 && route.length <= 4) return 'flight'
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

// overview 模式下展示的标记点，需与 makeRoute(overview) 经过的点保持一致，
// 否则会出现「路径经过 Canmore / Icefield 但地图上没有标记」的不一致。
const overviewKeys = ['YVR', 'YYC', 'Canmore', 'Banff', 'Louise', 'Icefield', 'Jasper', 'SEA']

export default function MapPanel({ route = [], overview = false, compact = false }) {
  const nodeRef = useRef(null)
  const mapRef = useRef(null)
  const [inView, setInView] = useState(false)

  // 仅在容器进入视口附近时才初始化 maplibre 实例，
  // 避免「展开全部 11 天」时同时创建 11 个地图造成的卡顿与内存占用。
  useEffect(() => {
    const node = nodeRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || !nodeRef.current) return undefined
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
      const keys = overview ? overviewKeys : route
      keys.forEach((key, index) => {
        const point = points[key]
        if (!point) return
        bounds.extend(point.coord)
        const marker = document.createElement('button')
        marker.className = `map-marker ${index === 0 ? 'start' : ''}`
        marker.type = 'button'
        marker.setAttribute('aria-label', point.name)
        // 用内层 span 承载序号，便于 CSS 反向旋转抵消 marker 的 -45deg 旋转。
        // 之前用 ::first-line 伪元素旋转是无效的（::first-line 不支持 transform）。
        marker.innerHTML = `<span>${index + 1}</span>`
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
  }, [route, overview, compact, inView])

  return (
    <div className={`map-canvas ${compact ? 'compact' : ''}`} ref={nodeRef} aria-label="交互式路线地图">
      {!inView && <div className="map-skeleton compact"><span>滚动到此处加载地图…</span></div>}
    </div>
  )
}
