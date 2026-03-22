import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer style={{ background: 'var(--color-neutral-900)', color: '#adb5bd' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 20px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, background: 'var(--color-primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15 }}>
              <i className="fas fa-car" />
            </div>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff' }}>
              {lang === 'ar' ? 'حديد_في_حديد' : 'hadidXhadid'}
            </span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 260, marginBottom: 18 }}>{t('footer_desc')}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['twitter', 'instagram', 'facebook', 'youtube'].map(s => (
              <a key={s} href="#" style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#adb5bd', fontSize: 13, textDecoration: 'none', transition: 'all 0.2s' }}>
                <i className={`fab fa-${s}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
            {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
          </h4>
          {[['/', t('nav_home')], ['/vehicles', t('nav_vehicles')], ['/mechanics', t('nav_mechanics')]].map(([to, label]) => (
            <Link key={to} to={to} style={{ display: 'block', color: '#adb5bd', fontSize: 13, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
            {lang === 'ar' ? 'الدعم' : 'Support'}
          </h4>
          {[t('about'), t('contact'), t('privacy'), t('terms')].map(l => (
            <a key={l} href="#" style={{ display: 'block', color: '#adb5bd', fontSize: 13, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}>
              {l}
            </a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', padding: '14px 20px', fontSize: 12 }}>
        © 2026 {lang === 'ar' ? 'حديد_في_حديد' : 'hadidXhadid'} — {t('rights')}
      </div>
    </footer>
  )
}
