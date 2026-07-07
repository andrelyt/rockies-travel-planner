import { useEffect, useState } from 'react'
import { CloudRain, RefreshCw, ThermometerSun, Wind } from 'lucide-react'

const clothing = {
  Banff: '抓绒 + 轻羽绒 + 冲锋衣', Canmore: '抓绒 + 防风外套', 'Lake Louise': '轻羽绒 + 防水鞋 + 手套',
  'Columbia Icefield': '保暖层 + 防风防水外层', Jasper: '抓绒 + 轻羽绒', Calgary: '分层穿衣 + 防风外套',
  Vancouver: '卫衣 + 防雨外套', Seattle: '薄外套 + 舒适步行鞋',
}

export default function WeatherCard({ weather }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setData(null)
    setError(false)
    const params = new URLSearchParams({
      latitude: weather.lat, longitude: weather.lon,
      current: 'temperature_2m,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: weather.zone, forecast_days: '1',
    })
    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error('weather'); return res.json() })
      .then(setData).catch((err) => { if (err.name !== 'AbortError') setError(true) })
    return () => controller.abort()
  }, [weather])

  return (
    <section className="side-card weather-card" aria-labelledby="weather-title">
      <div className="section-kicker"><ThermometerSun size={16} /> 实时天气</div>
      <div className="weather-heading">
        <div><h3 id="weather-title">{weather.city}</h3><p>当前数据 · 历史穿衣参考</p></div>
        {data && <strong>{Math.round(data.current.temperature_2m)}°</strong>}
      </div>
      {!data && !error && <div className="weather-loading"><RefreshCw size={18} className="spin" /> 正在获取天气…</div>}
      {error && <p className="muted">天气暂时无法加载，穿衣参考仍可使用。</p>}
      {data && (
        <div className="weather-stats">
          <span><ThermometerSun size={16} /> {Math.round(data.daily.temperature_2m_min[0])}° / {Math.round(data.daily.temperature_2m_max[0])}°</span>
          <span><CloudRain size={16} /> {data.daily.precipitation_probability_max[0]}%</span>
          <span><Wind size={16} /> {Math.round(data.current.wind_speed_10m)} km/h</span>
        </div>
      )}
      <div className="clothing"><span>出行穿搭</span><strong>{clothing[weather.city] || '分层穿衣 + 防雨外套'}</strong></div>
      <p className="weather-note">实时预报仅在临近出行时具有参考价值；页面会自动显示最新数据。</p>
    </section>
  )
}
