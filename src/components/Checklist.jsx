import { Check, Circle, Filter } from 'lucide-react'

export default function Checklist({ items, checked, onToggle, limit, compact = false }) {
  const visible = limit ? items.slice(0, limit) : items
  return (
    <div className={compact ? 'checklist compact-list' : 'checklist'}>
      {!compact && <div className="checklist-filter"><Filter size={16} /> 按优先级排列</div>}
      {visible.map(([id, title, priority, category]) => {
        const done = Boolean(checked[id])
        return (
          <button className={`check-row ${done ? 'done' : ''}`} key={id} onClick={() => onToggle(id)} aria-pressed={done}>
            <span className="check-icon">{done ? <Check size={16} /> : <Circle size={16} />}</span>
            <span className="check-copy"><strong>{title}</strong><small>{category} · {priority === 'critical' ? '必须完成' : priority === 'high' ? '建议提前' : '普通'}</small></span>
            <span className={`priority ${priority}`}>{priority === 'critical' ? '关键' : priority === 'high' ? '重要' : '一般'}</span>
          </button>
        )
      })}
    </div>
  )
}
