import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowRight, CalendarDays, Car, CheckCircle2, ChevronDown, ChevronUp,
  CircleDashed, CloudSun, ExternalLink, Fuel, Hotel, ListChecks, LockKeyhole, Map,
  MapPin, Menu, Navigation, Plane, Route, ShieldAlert, Sparkles, TrainFront, Users, X,
} from 'lucide-react'
import { checklist, days, flights, highlights } from './data'
import WeatherCard from './components/WeatherCard'
import Checklist from './components/Checklist'

const MapPanel = lazy(() => import('./components/MapPanel'))

function TravelMap(props) {
  return <Suspense fallback={<div className={`map-skeleton ${props.compact ? 'compact' : ''}`}><Map size={22} /><span>正在加载交互地图…</span></div>}><MapPanel {...props} /></Suspense>
}

const navItems = [
  ['overview', '总览'], ['flights', '航班'], ['route-map', '路线地图'], ['itinerary', '每日行程'],
  ['tasks', '预约待办'], ['risks', '风险提醒'],
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function FlightPanel() {
  return (
    <section className="flight-section section-shell" id="flights">
      <div className="section-heading">
        <div><span className="eyebrow">Locked itinerary</span><h2>已锁定航班</h2></div>
        <p>所有山区与城市行程均围绕以下航班设计。</p>
      </div>
      <div className="lock-banner"><LockKeyhole size={20} /><strong>航班已锁定</strong><span>不建议更改主航班</span></div>
      <div className="flight-grid">
        {flights.map((flight) => (
          <article className="flight-card" key={flight.id}>
            <div className="flight-date"><span>2026</span><strong>{flight.date}</strong></div>
            <div className="flight-main"><div><Plane size={17} /><strong>{flight.number}</strong></div><h3>{flight.route}</h3><p>{flight.status}</p></div>
            <time>{flight.time}</time>
          </article>
        ))}
      </div>
    </section>
  )
}

function Hero({ completed }) {
  return (
    <header className="hero" id="overview">
      <div className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content section-shell">
        <div className="hero-badge"><LockKeyhole size={15} /> 主航班已确认</div>
        <p className="hero-kicker">ROCKIES · VANCOUVER · SEATTLE</p>
        <h1>加拿大西部<br /><em>11日旅行路书</em></h1>
        <p className="hero-subtitle">香港出发｜温哥华入境｜卡尔加里落基山自驾｜西雅图回程</p>
        <div className="trip-meta">
          <span><CalendarDays size={18} /> 2026.09.25—10.05</span>
          <span><Users size={18} /> 4人</span>
          <span><Car size={18} /> 自驾 + 城市轻旅行</span>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => scrollToId('itinerary')}>查看每日行程 <ArrowRight size={18} /></button>
          <button className="ghost-button" onClick={() => scrollToId('route-map')}><Map size={18} /> 打开总地图</button>
        </div>
        <div className="hero-progress"><span><CheckCircle2 size={17} /> 行前准备</span><strong>{completed} / {checklist.length}</strong><div><i style={{ width: `${(completed / checklist.length) * 100}%` }} /></div></div>
      </div>
    </header>
  )
}

function Dashboard({ completed }) {
  const cards = [
    { icon: Plane, label: '待预订航班', value: '2 段', detail: 'YVR → YYC · YYC → YVR', tone: 'blue' },
    { icon: ListChecks, label: '关键预约', value: '4 项', detail: 'Shuttle · 冰原 · 游船 · 缆车', tone: 'orange' },
    { icon: ShieldAlert, label: '出发前核实', value: '3 项', detail: 'Jasper · 路况 · 运营日期', tone: 'green' },
    { icon: CheckCircle2, label: '准备进度', value: `${completed}/${checklist.length}`, detail: '勾选后自动保存在本机', tone: 'slate' },
  ]
  return <section className="dashboard section-shell">{cards.map(({ icon: Icon, ...card }) => <article className={`dash-card ${card.tone}`} key={card.label}><div><Icon size={20} /></div><span>{card.label}</span><strong>{card.value}</strong><p>{card.detail}</p></article>)}</section>
}

function Highlights() {
  return (
    <section className="section-shell highlights-section">
      <div className="section-heading"><div><span className="eyebrow">Signature moments</span><h2>这趟旅程，为这些时刻出发</h2></div></div>
      <div className="highlight-grid">{highlights.map((item, i) => <article className={`highlight-card card-${i + 1}`} key={item.title}><img src={item.image} alt={`${item.title}旅行风景`} loading="lazy" /><div><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.subtitle}</p></div></article>)}</div>
    </section>
  )
}

function RouteOverview() {
  return (
    <section className="route-section section-shell" id="route-map">
      <div className="section-heading"><div><span className="eyebrow">The grand route</span><h2>跨越三座城市与落基山脉</h2></div><p>飞行、自驾和城市交通以不同方式组织，地图用于规划，实际驾驶请使用专业导航。</p></div>
      <div className="overview-map-wrap">
        <TravelMap overview route={[]} />
        <div className="map-legend">
          <h3>11天 · 3个阶段</h3>
          <div><i className="legend-line flight" /><span><strong>飞行段</strong> HKG · YVR · YYC · SEA</span></div>
          <div><i className="legend-line drive" /><span><strong>自驾段</strong> Banff · Icefields · Jasper</span></div>
          <div><i className="legend-line city" /><span><strong>城市段</strong> Vancouver · Seattle</span></div>
          <p><Navigation size={15} /> 点击地图标记查看地点</p>
        </div>
      </div>
    </section>
  )
}

function AttractionCard({ attraction, onLocate }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <article className="attraction-card">
      <div className="attraction-image"><img src={attraction.image} alt={`${attraction.name}（${attraction.en}）风景`} loading="lazy" onError={(e) => { e.currentTarget.parentElement.classList.add('image-fallback') }} /><span>{attraction.photo}拍摄</span></div>
      <div className="attraction-body"><p className="en-name">{attraction.en}</p><h4>{attraction.name}</h4><p>{attraction.desc}</p><div className="attraction-meta"><span><CircleDashed size={15} /> {attraction.time}</span><button onClick={onLocate}><MapPin size={15} /> 地图定位</button></div>{expanded && <div className="detail-note">开放时间与预约状态请在临近出发时通过官方渠道再次核实。</div>}<button className="detail-toggle" onClick={() => setExpanded(!expanded)}>{expanded ? '收起信息' : '查看注意事项'} {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button></div>
    </article>
  )
}

function DecisionCards({ decisions }) {
  return <div className="decision-grid"><article className="decision recommended"><span>推荐方案</span><CheckCircle2 size={21} /><p>{decisions.recommended}</p></article><article className="decision backup"><span>备选方案</span><Route size={21} /><p>{decisions.backup}</p></article><article className="decision avoid"><span>不建议</span><X size={21} /><p>{decisions.avoid}</p></article></div>
}

function DayDetails({ day, checked, onToggle }) {
  const [mapOpen, setMapOpen] = useState(true)
  return (
    <article className="day-detail" id={`day-${day.day}`}>
      <header className="day-header">
        <div className="day-number"><span>DAY</span><strong>{String(day.day).padStart(2, '0')}</strong></div>
        <div className="day-title"><div><time>2026.{day.date} · {day.weekday}</time><span className="intensity">{day.intensity}</span></div><h2>{day.title}</h2><div className="tags">{day.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </header>

      <div className="command-card">
        <div><Car size={20} /><span>今日交通</span><strong>{day.transport}</strong></div>
        <div><Hotel size={20} /><span>今晚住宿</span><strong>{day.stay}</strong></div>
        <button onClick={() => setMapOpen(!mapOpen)}><Map size={18} /> {mapOpen ? '收起地图' : '打开地图'}</button>
      </div>

      {mapOpen && <div className="daily-map"><TravelMap route={day.route} compact /><div className="daily-map-note"><Navigation size={16} /><span>路线为路书示意，实际导航请结合实时道路开放状态。</span><a href={`https://www.google.com/maps/search/?api=1&query=${day.weather.lat},${day.weather.lon}`} target="_blank" rel="noreferrer">外部地图 <ExternalLink size={14} /></a></div></div>}

      <div className="day-main-grid">
        <div className="day-content">
          <section className="content-block"><div className="block-title"><span>01</span><div><p>DAILY FLOW</p><h3>当日时间轴</h3></div></div><div className="timeline-list">{day.timeline.map(([period, time, title, note], i) => <div className="timeline-row" key={`${title}-${i}`}><div className="timeline-dot" /><div className="timeline-time"><span>{period}</span><strong>{time}</strong></div><div><h4>{title}</h4><p>{note}</p></div></div>)}</div></section>
          {day.attractions.length > 0 && <section className="content-block"><div className="block-title"><span>02</span><div><p>PLACES TO SEE</p><h3>重点景点</h3></div></div><div className="attraction-grid">{day.attractions.map((a) => <AttractionCard key={a.name} attraction={a} onLocate={() => setMapOpen(true)} />)}</div></section>}
          <section className="content-block"><div className="block-title"><span>03</span><div><p>MAKE THE CALL</p><h3>当天怎么选</h3></div></div><DecisionCards decisions={day.decisions} /></section>
        </div>
        <aside className="day-aside">
          <WeatherCard weather={day.weather} />
          <section className="side-card alert-card"><div className="section-kicker"><AlertTriangle size={16} /> 今日提醒</div>{day.alerts.map((alert) => <p key={alert}><span />{alert}</p>)}</section>
          <section className="side-card stay-card"><div className="section-kicker"><Hotel size={16} /> 住宿与交通</div><h3>{day.stay}</h3><p>{day.transport}</p>{day.day === 4 && <div className="fuel-note"><Fuel size={16} /> 出发前务必加满油</div>}</section>
        </aside>
      </div>
    </article>
  )
}

function App() {
  const [selectedDay, setSelectedDay] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rockies-checklist') || '{}') } catch { return {} }
  })
  const [allDays, setAllDays] = useState(false)
  const currentDay = days.find((d) => d.day === selectedDay) || days[0]
  const completed = useMemo(() => Object.values(checked).filter(Boolean).length, [checked])

  useEffect(() => { localStorage.setItem('rockies-checklist', JSON.stringify(checked)) }, [checked])
  const toggleCheck = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  const selectDay = (day) => {
    setAllDays(false)
    setSelectedDay(day)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const card = document.getElementById(`day-${day}`)
      if (!card) return
      const stickyOffset = window.innerWidth <= 700 ? 164 : 182
      window.scrollTo({
        top: card.getBoundingClientRect().top + window.scrollY - stickyOffset,
        behavior: 'smooth',
      })
    }))
  }

  return (
    <div className="app-shell">
      <nav className="top-nav" aria-label="主要导航">
        <div className="nav-inner section-shell"><button className="brand" onClick={() => scrollToId('overview')}><span>R</span><div><strong>ROCKIES 2026</strong><small>TRAVEL FIELD GUIDE</small></div></button><div className={`nav-links ${menuOpen ? 'open' : ''}`}>{navItems.map(([id, label]) => <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false) }}>{label}</button>)}</div><div className="nav-status"><CloudSun size={17} /><span>数据在线</span></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航菜单">{menuOpen ? <X /> : <Menu />}</button></div>
      </nav>
      <main id="main-content">
        <Hero completed={completed} />
        <Dashboard completed={completed} />
        <FlightPanel />
        <Highlights />
        <RouteOverview />

        <section className="itinerary-section" id="itinerary">
          <div className="section-shell section-heading itinerary-heading"><div><span className="eyebrow">Day by day</span><h2>11日行程执行手册</h2></div><p>选择日期查看当日路线、天气、时间轴和备选方案。</p></div>
          <div className="day-tabs-wrap"><div className="day-tabs section-shell" role="tablist" aria-label="选择行程日期">{days.map((day) => <button role="tab" aria-selected={selectedDay === day.day} className={selectedDay === day.day ? 'active' : ''} key={day.day} onClick={() => selectDay(day.day)}><span>D{day.day}</span><strong>{day.date}</strong><small>{day.short}</small></button>)}</div></div>
          <div className="section-shell day-display">
            {!allDays ? <DayDetails day={currentDay} checked={checked} onToggle={toggleCheck} /> : days.map((day) => <DayDetails day={day} checked={checked} onToggle={toggleCheck} key={day.day} />)}
            <button className="all-days-button" onClick={() => setAllDays(!allDays)}>{allDays ? '只看当前日期' : '展开全部 11 天'} {allDays ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
          </div>
        </section>

        <section className="tasks-section section-shell" id="tasks">
          <div className="section-heading"><div><span className="eyebrow">Before you go</span><h2>行前预约与准备</h2></div><div className="big-progress"><strong>{completed}/{checklist.length}</strong><span>已完成</span></div></div>
          <div className="tasks-layout"><Checklist items={checklist} checked={checked} onToggle={toggleCheck} /><aside><ListChecks size={28} /><h3>优先处理红色项目</h3><p>Shuttle、两段国内航班、租车和证件是当前最关键事项。清单状态会保存在这台设备。</p><div className="progress-track"><i style={{ width: `${(completed / checklist.length) * 100}%` }} /></div></aside></div>
        </section>

        <section className="risks-section" id="risks"><div className="section-shell"><div className="section-heading light"><div><span className="eyebrow">Stay prepared</span><h2>把风险变成预案</h2></div><p>山区行程的好体验，来自对天气、道路和体力的尊重。</p></div><div className="risk-grid">{[
          ['温差与霜冻', '9月底山区早晚可能接近或低于0℃，穿衣采用可增减的分层方式。'],
          ['弱信号公路', 'Icefields Parkway 提前下载离线地图，保存酒店、加油点和紧急联系方式。'],
          ['Shuttle 与停车', 'Moraine Lake 私家车不能进入；开售后优先抢早班 Shuttle。'],
          ['Jasper 开放状态', '2024山火后部分区域状态可能变化，出发前一周核实官方开放地图。'],
          ['野生动物', '保持距离，不投喂；避免夜间进行长距离山路驾驶。'],
          ['城市段无车', '温哥华与西雅图停车成本高，公共交通、步行与网约车更合适。'],
        ].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><ShieldAlert size={21} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      </main>
      <footer><div className="section-shell"><div className="brand footer-brand"><span>R</span><div><strong>ROCKIES 2026</strong><small>TRAVEL FIELD GUIDE</small></div></div><p>地图 © OpenFreeMap · OpenMapTiles · OpenStreetMap contributors<br />天气数据由 Open-Meteo 提供 · 景点图片来自 Wikimedia Commons</p><p>最后更新：2026年7月7日<br />实际出行请以航司、公园及道路官方信息为准</p></div></footer>
      <nav className="mobile-bottom" aria-label="移动端快捷导航"><button onClick={() => scrollToId('itinerary')}><CalendarDays /><span>今日</span></button><button onClick={() => scrollToId('route-map')}><Map /><span>地图</span></button><button onClick={() => scrollToId('tasks')}><ListChecks /><span>待办</span></button><button onClick={() => scrollToId('risks')}><ShieldAlert /><span>风险</span></button></nav>
    </div>
  )
}

export default App
