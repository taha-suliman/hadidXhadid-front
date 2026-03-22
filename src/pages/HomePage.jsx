import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { vehicles, mechanics, testimonials } from '../data/mockData'
import VehicleCard from '../components/pages/VehicleCard'
import MechanicCard from '../components/pages/MechanicCard'
import StarRating from '../components/ui/StarRating'

const C = { maxWidth: 1280, margin: '0 auto', padding: '0 20px', width: '100%' }

export default function HomePage() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/vehicles${search ? `?q=${search}` : ''}`)
  }

  const featured    = vehicles.filter(v => v.featured)
  const topMechanics = mechanics.filter(m => m.featured)

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero ── */}
      <section style={{
        width: '100%', position: 'relative', minHeight: 580,
        display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0a1628 0%, #003580 55%, #007BFF 100%)',
        overflow: 'hidden',
      }}>
        {/* Dot pattern overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div style={{ position: 'relative', zIndex: 1, ...C, padding: '60px 20px' }}>
          {/* Badge */}
          <div style={{ marginBottom: 18 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,193,7,0.18)', border: '1px solid rgba(255,193,7,0.35)',
              color: '#FFC107', padding: '5px 16px', borderRadius: 20,
              fontSize: 13, fontWeight: 600,
            }}>
              <i className="fas fa-star" style={{ fontSize: 10 }} />
              {lang === 'ar' ? 'منصة #1 للمركبات' : '#1 Vehicle Platform'}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: 900, color: '#fff', lineHeight: 1.15,
            marginBottom: 14, maxWidth: 700,
          }}>
            {t('hero_title')}
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.78)',
            marginBottom: 28, maxWidth: 500, lineHeight: 1.6,
          }}>
            {t('hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            <button onClick={() => navigate('/vehicles')} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 26px', background: '#fff', color: '#007BFF',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(255,255,255,0.2)',
            }}>
              <i className="fas fa-car" /> {t('hero_cta_vehicles')}
            </button>
            <button onClick={() => navigate('/mechanics')} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 26px', background: 'transparent', color: '#fff',
              border: '2px solid rgba(255,255,255,0.5)', borderRadius: 12,
              fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="fas fa-tools" /> {t('hero_cta_mechanics')}
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{
            display: 'flex', maxWidth: 580, background: '#fff',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.22)', marginBottom: 32,
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', color: '#6C757D' }}>
              <i className="fas fa-search" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 14, color: '#343A40', padding: '14px 0',
                  background: 'transparent', fontFamily: 'inherit',
                  minWidth: 0,
                }}
              />
            </div>
            <button type="submit" style={{
              padding: '14px 24px', background: '#007BFF', color: '#fff',
              border: 'none', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              {t('search_btn')}
            </button>
          </form>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[
              { num: '2,400+', label: lang === 'ar' ? 'مركبة معروضة' : 'Vehicles Listed' },
              { num: '850+',   label: lang === 'ar' ? 'ميكانيكي موثق' : 'Verified Mechanics' },
              { num: '15K+',   label: lang === 'ar' ? 'عملية ناجحة' : 'Successful Deals' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                </div>
                {i < 2 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Vehicles ── */}
      <section style={{ width: '100%', padding: '64px 0', background: '#F8F9FA' }}>
        <div style={C}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
            <div>
              <h2 className="section-title">{t('featured_vehicles')}</h2>
              <p style={{ color: '#6C757D', fontSize: 14, marginTop: 4 }}>{lang === 'ar' ? 'أفضل المركبات المعروضة حالياً' : 'Best vehicles currently listed'}</p>
            </div>
            <button onClick={() => navigate('/vehicles')} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px',
              background: '#e8f4ff', color: '#007BFF', border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
            }}>
              {t('view_all')} <i className="fas fa-arrow-left" style={{ transform: 'scaleX(-1)' }} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {featured.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ width: '100%', padding: '64px 0', background: '#fff' }}>
        <div style={C}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">{t('how_it_works')}</h2>
            <p style={{ color: '#6C757D', fontSize: 14 }}>{lang === 'ar' ? 'ثلاث خطوات بسيطة للوصول إلى ما تريد' : 'Three simple steps to get what you need'}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
            {[
              { icon: 'fas fa-search',        num: '01', title: t('step1_title'), desc: t('step1_desc'), color: '#007BFF', bg: '#e8f4ff' },
              { icon: 'fas fa-comments',       num: '02', title: t('step2_title'), desc: t('step2_desc'), color: '#28A745', bg: '#e8f8ec' },
              { icon: 'fas fa-calendar-check', num: '03', title: t('step3_title'), desc: t('step3_desc'), color: '#d39e00', bg: '#fff8e1' },
            ].map(step => (
              <div key={step.num} className="card" style={{ padding: '28px 22px', textAlign: 'center', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 14, insetInlineEnd: 14, fontSize: 32, fontWeight: 900, color: '#DEE2E6', lineHeight: 1 }}>{step.num}</span>
                <div style={{ width: 60, height: 60, background: step.bg, color: step.color, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>
                  <i className={step.icon} />
                </div>
                <h3 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#6C757D', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Mechanics ── */}
      <section style={{ width: '100%', padding: '64px 0', background: '#F8F9FA' }}>
        <div style={C}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
            <div>
              <h2 className="section-title">{t('top_mechanics')}</h2>
              <p style={{ color: '#6C757D', fontSize: 14, marginTop: 4 }}>{lang === 'ar' ? 'ميكانيكيون موثوقون بأعلى التقييمات' : 'Trusted top-rated mechanics'}</p>
            </div>
            <button onClick={() => navigate('/mechanics')} style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px',
              background: '#e8f4ff', color: '#007BFF', border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
            }}>
              {t('view_all')} <i className="fas fa-arrow-left" style={{ transform: 'scaleX(-1)' }} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {topMechanics.map(m => <MechanicCard key={m.id} mechanic={m} />)}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ width: '100%', padding: '64px 0', background: 'linear-gradient(135deg, #0a1628, #003580)' }}>
        <div style={C}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{t('testimonials')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{lang === 'ar' ? 'ماذا يقول عملاؤنا عن تجربتهم' : 'What our customers say'}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {testimonials.map(item => (
              <div key={item.id} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 14, padding: 24, backdropFilter: 'blur(8px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, background: '#007BFF', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                    {item.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{lang === 'ar' ? item.name_ar : item.name_en}</div>
                    <StarRating rating={item.rating} size="13px" />
                  </div>
                  <i className="fas fa-quote-right" style={{ marginInlineStart: 'auto', color: 'rgba(255,255,255,0.18)', fontSize: 22 }} />
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>{lang === 'ar' ? item.text_ar : item.text_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ width: '100%', padding: '48px 0', background: '#e8f8ec' }}>
        <div style={{ ...C, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 20, fontWeight: 700, color: '#343A40', marginBottom: 6 }}>
              {lang === 'ar' ? 'هل أنت ميكانيكي محترف؟' : 'Are you a professional mechanic?'}
            </h2>
            <p style={{ fontSize: 14, color: '#6C757D' }}>
              {lang === 'ar' ? 'انضم وتواصل مع آلاف العملاء في منطقتك' : 'Join and connect with thousands of customers in your area'}
            </p>
          </div>
          <button onClick={() => navigate('/register')} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '13px 26px', background: '#28A745', color: '#fff',
            border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
          }}>
            {lang === 'ar' ? 'سجل كميكانيكي الآن' : 'Register as Mechanic'}
            <i className="fas fa-arrow-left" style={{ transform: 'scaleX(-1)' }} />
          </button>
        </div>
      </section>

    </div>
  )
}
