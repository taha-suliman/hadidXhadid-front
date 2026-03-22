import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'
import { Spinner, ErrorMsg } from '../ui/Feedback'

const statusStyles = {
  confirmed: 'badge badge-secondary',
  pending:   'badge badge-accent',
  completed: 'badge badge-primary',
  cancelled: 'badge badge-danger',
}

export default function AppointmentsTab({ appointments, aLoading, aError, updateStatus, show }) {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const isMechanic = user?.userType === 'mechanic' || user?.role === 'mechanic'

  const handleCancel = async (id) => {
    const r = await updateStatus(id, 'cancelled')
    if (r.success) show(lang === 'ar' ? 'تم إلغاء الموعد' : 'Appointment cancelled', 'info')
    else show(r.message, 'error')
  }

  const handleConfirm = async (id) => {
    const r = await updateStatus(id, 'confirmed')
    if (r.success) show(lang === 'ar' ? 'تم تأكيد الموعد' : 'Appointment confirmed', 'success')
    else show(r.message, 'error')
  }

  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-base mb-5">{t('my_appointments')}</h2>

      {aLoading ? (
        <Spinner center />
      ) : aError ? (
        <ErrorMsg message={aError} lang={lang} />
      ) : appointments.length === 0 ? (
        <p className="text-center text-neutral-400 py-12">
          {lang === 'ar' ? 'لا توجد مواعيد' : 'No appointments yet'}
        </p>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  {[
                    lang === 'ar' ? 'الميكانيكي'      : 'Mechanic',
                    lang === 'ar' ? 'الخدمة'          : 'Service',
                    lang === 'ar' ? 'التاريخ والوقت'  : 'Date & Time',
                    lang === 'ar' ? 'الحالة'          : 'Status',
                    lang === 'ar' ? 'إجراءات'         : 'Actions',
                  ].map(h => (
                    <th key={h} className="px-5 py-3.5 text-start text-xs font-bold text-neutral-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {appointments.map(a => (
                  <tr key={a.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4 font-medium">{a.mechanicName || '—'}</td>
                    <td className="px-5 py-4 text-neutral-600">{a.serviceName || '—'}</td>
                    <td className="px-5 py-4 text-neutral-600 whitespace-nowrap">{a.appointmentDate} · {a.appointmentTime}</td>
                    <td className="px-5 py-4">
                      <span className={statusStyles[a.status]}>{t(a.status)}</span>
                    </td>
                    <td className="px-5 py-4 flex items-center gap-2">
                      {a.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(a.id)}
                          className="px-3 py-1.5 border border-danger text-danger text-xs font-semibold rounded-lg hover:bg-danger-light transition-colors"
                        >
                          <i className="fas fa-times me-1" />{t('cancel')}
                        </button>
                      )}
                      {isMechanic && a.status === 'pending' && (
                        <button
                          onClick={() => handleConfirm(a.id)}
                          className="px-3 py-1.5 border border-secondary text-secondary text-xs font-semibold rounded-lg hover:bg-secondary-light transition-colors"
                        >
                          <i className="fas fa-check me-1" />{t('accept')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
