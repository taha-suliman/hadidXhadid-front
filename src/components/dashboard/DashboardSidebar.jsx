import { useNavigate } from 'react-router-dom'
import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAuthApi } from '../../hooks/useAuthApi'

export default function DashboardSidebar({ active, setActive, setSidebarOpen, navItems, pendingCount }) {
  const { lang, t } = useLang()
  const { user } = useAuth()
  const { logout } = useAuthApi()
  const navigate = useNavigate()

  const isMechanic = user?.userType === 'mechanic' || user?.role === 'mechanic'
  const navLabel = item => lang === 'ar' ? item.labelAr : item.labelEn

  return (
    <>
      {/* User info */}
      <div className="p-5 border-b border-neutral-200 flex items-center gap-3">
        <div className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold shrink-0">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm truncate">{user?.name}</div>
          <span className="badge badge-primary text-[11px]">
            {isMechanic ? (lang === 'ar' ? 'ميكانيكي' : 'Mechanic') : (lang === 'ar' ? 'مستخدم' : 'User')}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-3 flex-1">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => { setActive(item.key); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all duration-200 text-start
              ${active === item.key
                ? 'bg-primary-light text-primary font-bold'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
          >
            <i className={`${item.icon} w-4 text-center`} />
            {navLabel(item)}
            {item.key === 'appointments' && pendingCount > 0 && (
              <span className="ms-auto w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate('/') }}
        className="flex items-center gap-3 w-full px-5 py-4 border-t border-neutral-200 text-sm font-semibold text-danger hover:bg-danger-light transition-colors"
      >
        <i className="fas fa-sign-out-alt" /> {t('nav_logout')}
      </button>
    </>
  )
}
