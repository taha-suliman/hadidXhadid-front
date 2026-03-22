import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { useAuthApi } from '../hooks/useAuthApi'

export default function AuthPage({ mode = 'login' }) {
  const { t, lang } = useLang()
  const { login, register, loading } = useAuthApi()
  const navigate = useNavigate()
  const isLogin = mode === 'login'

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '', role: 'user', phone: '' })
  const [errors, setErrors]   = useState({})
  const [serverErr, setServerErr] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!isLogin && !form.name.trim()) e.name = lang === 'ar' ? 'الاسم مطلوب' : 'Name is required'
    if (!form.email.includes('@')) e.email = lang === 'ar' ? 'بريد إلكتروني غير صحيح' : 'Invalid email'
    if (form.password.length < 6) e.password = lang === 'ar' ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters'
    if (!isLogin && form.password !== form.confirm) e.confirm = lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerErr('')
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    const result = isLogin
      ? await login(form.email, form.password)
      : await register({ name: form.name, email: form.email, password: form.password, phone: form.phone, role: form.role })

    if (result.success) {
      navigate('/dashboard')
    } else {
      setServerErr(result.message || (lang === 'ar' ? 'حدث خطأ، حاول مجدداً' : 'An error occurred, try again'))
    }
  }

  const fieldStyle = (hasErr) => ({
    width: '100%', padding: '11px 14px 11px 40px', border: `1.5px solid ${hasErr ? '#DC3545' : '#DEE2E6'}`,
    borderRadius: 10, fontSize: 14, color: '#343A40', background: '#fff', outline: 'none',
    transition: 'all 0.2s', fontFamily: 'inherit',
  })

  const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, color: '#343A40', marginBottom: 6 }
  const iconStyle  = { position: 'absolute', insetInlineStart: 14, top: '50%', transform: 'translateY(-50%)', color: '#ADB5BD', fontSize: 13, pointerEvents: 'none' }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 16px',
      background: 'linear-gradient(135deg, #0a1628 0%, #003580 60%, #007BFF 100%)',
    }}>
      <div style={{
        width: '100%', maxWidth: 460, background: '#fff', borderRadius: 20,
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)', padding: 32,
        animation: 'slideUp 0.35s ease forwards',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, background: '#007BFF', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, boxShadow: '0 4px 12px rgba(0,123,255,0.3)' }}>
            <i className="fas fa-car" />
          </div>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 24, fontWeight: 800, color: '#007BFF' }}>
            {lang === 'ar' ? 'حديد_في_حديد' : 'hadidXhadid'}
          </span>
        </div>

        <h1 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 4, color: '#343A40' }}>
          {isLogin ? t('login') : t('register')}
        </h1>
        <p style={{ fontSize: 13, color: '#6C757D', textAlign: 'center', marginBottom: 24 }}>
          {isLogin
            ? (lang === 'ar' ? 'أهلاً بعودتك! سجّل دخولك للمتابعة' : 'Welcome back! Sign in to continue')
            : (lang === 'ar' ? 'انضم إلى حديد_في_حديد اليوم مجاناً' : 'Join hadidXhadid today for free')}
        </p>

        {/* Social buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[{ icon: 'fab fa-google', color: '#ea4335', label: 'Google' }, { icon: 'fab fa-facebook', color: '#1877f2', label: 'Facebook' }].map(s => (
            <button key={s.label} type="button" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px', border: '1.5px solid #DEE2E6', borderRadius: 12,
              fontSize: 13, fontWeight: 600, color: '#343A40', background: '#fff',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#007BFF'; e.currentTarget.style.background = '#e8f4ff' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#DEE2E6'; e.currentTarget.style.background = '#fff' }}>
              <i className={s.icon} style={{ color: s.color }} /> {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#ADB5BD', marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#DEE2E6' }} />
          <span>{lang === 'ar' ? 'أو' : 'or'}</span>
          <div style={{ flex: 1, height: 1, background: '#DEE2E6' }} />
        </div>

        {/* Server error */}
        {serverErr && (
          <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fde8ea', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 12, fontSize: 13, color: '#DC3545', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-exclamation-circle" style={{ flexShrink: 0 }} /> {serverErr}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Name */}
          {!isLogin && (
            <div>
              <label style={labelStyle}>{t('full_name')}</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-user" style={iconStyle} />
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  style={fieldStyle(errors.name)} />
              </div>
              {errors.name && <p style={{ fontSize: 12, color: '#DC3545', marginTop: 4 }}>{errors.name}</p>}
            </div>
          )}

          {/* Phone */}
          {!isLogin && (
            <div>
              <label style={labelStyle}>{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-phone" style={iconStyle} />
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+249123456789" style={fieldStyle(false)} />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label style={labelStyle}>{t('email')}</label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-envelope" style={iconStyle} />
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                style={fieldStyle(errors.email)} />
            </div>
            {errors.email && <p style={{ fontSize: 12, color: '#DC3545', marginTop: 4 }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>{t('password')}</label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-lock" style={iconStyle} />
              <input type="password" value={form.password} onChange={e => set('password', e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                style={fieldStyle(errors.password)} />
            </div>
            {errors.password && <p style={{ fontSize: 12, color: '#DC3545', marginTop: 4 }}>{errors.password}</p>}
          </div>

          {/* Confirm + Role */}
          {!isLogin && (
            <>
              <div>
                <label style={labelStyle}>{t('confirm_password')}</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-lock" style={iconStyle} />
                  <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
                    placeholder={lang === 'ar' ? 'أعد كتابة كلمة المرور' : 'Confirm your password'}
                    style={fieldStyle(errors.confirm)} />
                </div>
                {errors.confirm && <p style={{ fontSize: 12, color: '#DC3545', marginTop: 4 }}>{errors.confirm}</p>}
              </div>

              <div>
                <label style={labelStyle}>{t('select_role')}</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[{ key: 'user', icon: 'fas fa-user', label: t('role_user') }, { key: 'mechanic', icon: 'fas fa-tools', label: t('role_mechanic') }].map(r => (
                    <button type="button" key={r.key} onClick={() => set('role', r.key)} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      padding: '16px 12px', border: `2px solid ${form.role === r.key ? '#007BFF' : '#DEE2E6'}`,
                      borderRadius: 12, fontSize: 13, fontWeight: 600,
                      background: form.role === r.key ? '#e8f4ff' : '#fff',
                      color: form.role === r.key ? '#007BFF' : '#6C757D',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                    }}>
                      <i className={`${r.icon} text-xl`} /> {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {isLogin && (
            <div style={{ textAlign: 'end' }}>
              <a href="#" style={{ fontSize: 12, color: '#007BFF' }}>{t('forgot_password')}</a>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '13px', background: loading ? '#6C757D' : '#007BFF', color: '#fff',
            fontWeight: 700, borderRadius: 12, border: 'none', fontSize: 15,
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            transition: 'all 0.2s', marginTop: 4,
          }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.background = '#0056b3' }}
            onMouseOut={e => { if (!loading) e.currentTarget.style.background = '#007BFF' }}>
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> {t('loading')}</>
              : isLogin ? t('login') : t('register')}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#6C757D', marginTop: 20 }}>
          {isLogin ? t('no_account') : t('have_account')}
          {' '}
          <Link to={isLogin ? '/register' : '/login'} style={{ color: '#007BFF', fontWeight: 700 }}>
            {isLogin ? t('register') : t('login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
