import { useState, useEffect } from 'react'

// ─── Spinner ─────────────────────────────────────────────────
export function Spinner({ size = 'md', center = false }) {
  const dims = { sm: { w: 20, b: 2 }, md: { w: 36, b: 3 }, lg: { w: 56, b: 4 } }[size]
  const el = (
    <div style={{
      width: dims.w, height: dims.w,
      borderRadius: '50%',
      border: `${dims.b}px solid #DEE2E6`,
      borderTopColor: '#007BFF',
      animation: 'spin 0.8s linear infinite',
    }} />
  )
  if (center) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 0' }}>{el}</div>
  return el
}

// ─── رسالة خطأ ───────────────────────────────────────────────
export function ErrorMsg({ message, onRetry, lang = 'ar' }) {
  return (
    <div style={{ textAlign: 'center', padding: '56px 0', color: '#6C757D' }}>
      <i className="fas fa-exclamation-circle" style={{ fontSize: 40, color: 'rgba(220,53,69,0.45)', display: 'block', marginBottom: 12 }} />
      <p style={{ fontSize: 14, marginBottom: 16 }}>{message || (lang === 'ar' ? 'حدث خطأ، حاول مجدداً' : 'Something went wrong')}</p>
      {onRetry && (
        <button onClick={onRetry}
          style={{ padding: '8px 20px', background: '#007BFF', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          {lang === 'ar' ? 'إعادة المحاولة' : 'Retry'}
        </button>
      )}
    </div>
  )
}

// ─── حالة فارغة ──────────────────────────────────────────────
export function EmptyState({ icon = 'fas fa-inbox', title, subtitle, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 0', color: '#6C757D' }}>
      <i className={icon} style={{ fontSize: 48, color: '#DEE2E6', display: 'block', marginBottom: 16 }} />
      {title && <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: '#343A40' }}>{title}</p>}
      {subtitle && <p style={{ fontSize: 14, marginBottom: 20 }}>{subtitle}</p>}
      {action}
    </div>
  )
}

// ─── Toast notification ───────────────────────────────────────
export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const bgMap = { success: '#28A745', error: '#DC3545', info: '#007BFF' }
  const iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' }

  return (
    <div style={{
      position: 'fixed', bottom: 20, insetInlineEnd: 20, zIndex: 50,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 20px', borderRadius: 14,
      background: bgMap[type], color: '#fff',
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      animation: 'fadeIn 0.35s ease forwards',
    }}>
      <i className={`fas ${iconMap[type]}`} />
      <span style={{ fontSize: 14, fontWeight: 600 }}>{message}</span>
      <button onClick={onClose} style={{ marginInlineStart: 8, opacity: 0.75, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
        <i className="fas fa-times" style={{ fontSize: 12 }} />
      </button>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState(null)
  const show = (message, type = 'success') => setToast({ message, type })
  const hide = () => setToast(null)
  const ToastEl = toast ? <Toast {...toast} onClose={hide} /> : null
  return { show, ToastEl }
}
