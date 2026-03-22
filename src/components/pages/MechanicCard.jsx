import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import StarRating from '../ui/StarRating'

export default function MechanicCard({ mechanic }) {
  const { t, lang } = useLang()
  const name = lang === 'ar' ? mechanic.name_ar || mechanic.name : mechanic.name_en || mechanic.name
  const location = lang === 'ar'
    ? (mechanic.location_ar || mechanic.city || '')
    : (mechanic.location_en || mechanic.city || '')
  const specialties = lang === 'ar'
    ? (mechanic.specialties_ar || mechanic.specialization || [])
    : (mechanic.specialties_en || mechanic.specialization || [])

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.35s ease forwards' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 14, padding: '16px 16px 12px' }}>
        <img
          src={mechanic.image || mechanic.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=007BFF&color=fff&size=64`}
          alt={name}
          style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary-light)', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--color-neutral-900)' }}>{name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
            <StarRating rating={mechanic.rating || 0} size="text-xs" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-accent-dark)' }}>{(mechanic.rating || 0).toFixed(1)}</span>
            <span style={{ fontSize: 12, color: 'var(--color-neutral-600)' }}>({mechanic.reviewCount || mechanic.reviews || 0} {t('reviews')})</span>
          </div>
          {location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--color-neutral-600)' }}>
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--color-danger)', fontSize: 10 }} /> {location}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(mechanic.experience || mechanic.yearsOfExperience) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-neutral-600)' }}>
            <i className="fas fa-briefcase" style={{ color: 'var(--color-primary)', fontSize: 11 }} />
            {mechanic.experience || mechanic.yearsOfExperience} {t('years_exp')}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {specialties.slice(0, 3).map((s, i) => (
            <span key={i} className="tag">{s}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 8, padding: '12px 16px', borderTop: '1px solid var(--color-neutral-200)', marginTop: 'auto' }}>
        <Link to={`/mechanics/${mechanic.id}`}
          style={{ padding: '8px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', borderRadius: 8, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
          {t('view_profile')}
        </Link>
        <Link to={`/mechanics/${mechanic.id}#booking`}
          style={{ padding: '8px', textAlign: 'center', fontSize: 13, fontWeight: 600, background: 'var(--color-primary)', color: '#fff', borderRadius: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--color-primary-dark)'}
          onMouseOut={e => e.currentTarget.style.background = 'var(--color-primary)'}>
          <i className="fas fa-calendar-check" style={{ fontSize: 11 }} /> {t('book_appointment')}
        </Link>
      </div>
    </div>
  )
}
