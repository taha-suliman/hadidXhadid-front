import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import StarRating from '../ui/StarRating'

export default function VehicleCard({ vehicle }) {
  const { t, lang } = useLang()

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadeIn 0.35s ease forwards' }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10' }}>
        <img src={vehicle.image} alt={`${vehicle.brand || vehicle.make} ${vehicle.model}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease', display: 'block' }}
          loading="lazy"
          onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
        />
        <span style={{ position: 'absolute', top: 10, insetInlineEnd: 10, background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, backdropFilter: 'blur(4px)' }}>
          {vehicle.year}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-neutral-900)', margin: 0 }}>
          {vehicle.brand || vehicle.make} {vehicle.model}
        </h3>

        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
          {(vehicle.price || vehicle.salePrice || 0).toLocaleString()}
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-neutral-600)', marginInlineStart: 4 }}>{t('sar')}</span>
        </div>

        {/* Meta tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            { icon: 'fas fa-road', val: `${(vehicle.km || vehicle.mileage || 0).toLocaleString()} ${t('km')}` },
            { icon: 'fas fa-map-marker-alt', val: lang === 'ar' ? (vehicle.location_ar || vehicle.city || '') : (vehicle.location || vehicle.city || '') },
            { icon: 'fas fa-gas-pump', val: t(`fuel_${vehicle.fuel || vehicle.fuelType}`) || vehicle.fuelType },
          ].filter(m => m.val).map((m, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-neutral-600)', background: 'var(--color-neutral-100)', padding: '3px 9px', borderRadius: 20 }}>
              <i className={m.icon} style={{ color: 'var(--color-primary)', fontSize: 11 }} /> {m.val}
            </span>
          ))}
        </div>

        {/* Seller */}
        {vehicle.seller && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 24, background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                {vehicle.seller.name?.charAt(0)}
              </div>
              <span style={{ fontSize: 12, color: 'var(--color-neutral-600)' }}>{vehicle.seller.name}</span>
            </div>
            <StarRating rating={vehicle.seller.rating} size="text-xs" />
          </div>
        )}

        {/* CTA */}
        <Link to={`/vehicles/${vehicle.id}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', marginTop: 'auto' }}
          onMouseOver={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#fff' }}
          onMouseOut={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)' }}>
          {t('view_details')} <i className="fas fa-arrow-left" style={{ transform: 'scaleX(-1)' }} />
        </Link>
      </div>
    </div>
  )
}
