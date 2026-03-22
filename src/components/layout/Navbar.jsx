import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'

const NAV_H = 64

export default function Navbar() {
  const { t, toggleLang, lang } = useLang()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const handleLogout = () => { logout(); navigate('/'); setDropOpen(false); setMenuOpen(false) }

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/vehicles', label: t('nav_vehicles') },
    { to: '/mechanics', label: t('nav_mechanics') },
  ]

  const linkStyle = {
    padding: '7px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600,
    color: '#6C757D', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block',
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100, width: '100%',
      background: '#fff', borderBottom: '1px solid #DEE2E6',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      {/* Main bar */}
      <div style={{
        width: '100%', maxWidth: 1280, margin: '0 auto',
        padding: '0 20px', height: NAV_H,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, background: '#007BFF', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16,
          }}>
            <i className="fas fa-car" />
          </div>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 20, fontWeight: 800, color: '#007BFF' }}>
            {lang === 'ar' ? 'جديدXحديد' : 'hadidXhadid'}
          </span>
        </Link>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={linkStyle}
                onMouseOver={e => { e.currentTarget.style.color = '#007BFF'; e.currentTarget.style.background = '#e8f4ff' }}
                onMouseOut={e => { e.currentTarget.style.color = '#6C757D'; e.currentTarget.style.background = 'transparent' }}>
                {l.label}
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginInlineStart: 'auto' }}>
          {/* Lang toggle */}
          <button onClick={toggleLang} style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
            border: '1.5px solid #DEE2E6', borderRadius: 8, background: 'transparent',
            color: '#6C757D', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <i className="fas fa-globe" style={{ fontSize: 12 }} />
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>

          {/* Auth */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(o => !o)} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '5px 12px 5px 8px',
                border: '1.5px solid #DEE2E6', borderRadius: 30,
                background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{
                  width: 28, height: 28, background: '#007BFF', color: '#fff',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 13, fontWeight: 700,
                }}>
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                {!isMobile && (
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#343A40' }}>{user.name}</span>
                )}
                <i className="fas fa-chevron-down" style={{ fontSize: 10, color: '#6C757D' }} />
              </button>

              {dropOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', insetInlineEnd: 0,
                  background: '#fff', border: '1px solid #DEE2E6',
                  borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  minWidth: 170, overflow: 'hidden', zIndex: 200,
                }}>
                  <Link to="/dashboard" onClick={() => setDropOpen(false)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', fontSize: 14, fontWeight: 500,
                    color: '#343A40', textDecoration: 'none',
                  }}>
                    <i className="fas fa-th-large" style={{ color: '#007BFF' }} /> {t('nav_dashboard')}
                  </Link>
                  <button onClick={handleLogout} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', fontSize: 14, fontWeight: 500,
                    color: '#DC3545', background: 'none', border: 'none',
                    width: '100%', textAlign: 'inherit', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    <i className="fas fa-sign-out-alt" /> {t('nav_logout')}
                  </button>
                </div>
              )}
            </div>
          ) : !isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link to="/login" style={{
                padding: '7px 16px', fontSize: 14, fontWeight: 600,
                color: '#007BFF', textDecoration: 'none', borderRadius: 8,
              }}>
                {t('nav_login')}
              </Link>
              <Link to="/register" style={{
                padding: '7px 16px', fontSize: 14, fontWeight: 700,
                background: '#007BFF', color: '#fff', textDecoration: 'none', borderRadius: 8,
              }}>
                {t('nav_register')}
              </Link>
            </div>
          ) : null}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: 'none', border: 'none', fontSize: 20,
              color: '#343A40', padding: '4px 6px', cursor: 'pointer',
            }}>
              <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{ borderTop: '1px solid #DEE2E6', background: '#fff', width: '100%' }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '13px 20px', fontSize: 15,
              fontWeight: 600, color: '#343A40', textDecoration: 'none',
              borderBottom: '1px solid #f0f0f0',
            }}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '13px 20px', fontSize: 15,
                fontWeight: 600, color: '#343A40', textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0',
              }}>
                <i className="fas fa-th-large" style={{ marginInlineEnd: 8, color: '#007BFF' }} />
                {t('nav_dashboard')}
              </Link>
              <button onClick={handleLogout} style={{
                display: 'block', width: '100%', textAlign: 'inherit',
                padding: '13px 20px', fontSize: 15, fontWeight: 600,
                color: '#DC3545', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <i className="fas fa-sign-out-alt" style={{ marginInlineEnd: 8 }} />
                {t('nav_logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '13px 20px', fontSize: 15,
                fontWeight: 600, color: '#007BFF', textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0',
              }}>
                {t('nav_login')}
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '13px 20px', fontSize: 15,
                fontWeight: 600, color: '#007BFF', textDecoration: 'none',
              }}>
                {t('nav_register')}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
