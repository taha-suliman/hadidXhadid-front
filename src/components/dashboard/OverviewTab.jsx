import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'
import { Spinner } from '../ui/Feedback'

const statusStyles = {
  confirmed: 'badge badge-secondary',
  pending:   'badge badge-accent',
  completed: 'badge badge-primary',
  cancelled: 'badge badge-danger',
}

export default function OverviewTab({ vehicles, services, appointments, aLoading, confirmedCount, pendingCount, setActive }) {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const isMechanic = user?.userType === 'mechanic' || user?.role === 'mechanic'

  const stats = [
    {
      icon:  isMechanic ? 'fas fa-tools' : 'fas fa-car',
      num:   isMechanic ? services.length : vehicles.length,
      label: isMechanic ? t('my_services') : t('total_vehicles'),
      bg:    'bg-blue-50',
      color: 'text-primary',
    },
    {
      icon:  'fas fa-calendar-check',
      num:   confirmedCount + pendingCount,
      label: t('upcoming_appointments'),
      bg:    'bg-green-50',
      color: 'text-secondary',
    },
    {
      icon:  'fas fa-star',
      num:   user?.rating ? parseFloat(user.rating || 0).toFixed(1) : '—',
      label: t('avg_rating'),
      bg:    'bg-yellow-50',
      color: 'text-accent-dark',
    },
  ]

  return (
    <div className="animate-fade-in space-y-6">
      <p className="text-neutral-600">{t('welcome')}, <strong>{user?.name}</strong> 👋</p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center text-xl shrink-0`}>
              <i className={s.icon} />
            </div>
            <div>
              <div className="text-2xl font-extrabold">{s.num}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent appointments */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="font-bold text-sm">{lang === 'ar' ? 'آخر المواعيد' : 'Recent Appointments'}</h2>
          <button onClick={() => setActive('appointments')} className="text-xs text-primary font-semibold hover:underline">
            {t('view_all')}
          </button>
        </div>

        {aLoading ? (
          <Spinner center />
        ) : appointments.length === 0 ? (
          <p className="text-center text-sm text-neutral-400 py-8">
            {lang === 'ar' ? 'لا توجد مواعيد' : 'No appointments yet'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  {[
                    lang === 'ar' ? 'الميكانيكي' : 'Mechanic',
                    lang === 'ar' ? 'الخدمة'     : 'Service',
                    lang === 'ar' ? 'التاريخ'    : 'Date',
                    lang === 'ar' ? 'الحالة'     : 'Status',
                  ].map(h => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-bold text-neutral-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {appointments.slice(0, 5).map(a => (
                  <tr key={a.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium">{a.mechanicName || '—'}</td>
                    <td className="px-5 py-3.5 text-neutral-600">{a.serviceName || '—'}</td>
                    <td className="px-5 py-3.5 text-neutral-600 whitespace-nowrap">{a.appointmentDate} · {a.appointmentTime}</td>
                    <td className="px-5 py-3.5">
                      <span className={statusStyles[a.status]}>{t(a.status)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
