import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'
import { Spinner, ErrorMsg } from '../ui/Feedback'

export default function ItemsTab({ vehicles, services, vLoading, sLoading, vError, sError, removeVehicle, removeService, show }) {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const isMechanic = user?.userType === 'mechanic' || user?.role === 'mechanic'

  const isLoading = isMechanic ? sLoading : vLoading
  const hasError  = isMechanic ? sError   : vError
  const items     = isMechanic ? services  : vehicles

  const handleDelete = async (id) => {
    const r = isMechanic ? await removeService(id) : await removeVehicle(id)
    if (r.success) show(lang === 'ar' ? 'تم الحذف' : 'Deleted', 'info')
    else show(r.message, 'error')
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base">{isMechanic ? t('my_services') : t('my_vehicles')}</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all duration-200">
          <i className="fas fa-plus text-xs" />
          {isMechanic ? t('add_service') : t('add_vehicle')}
        </button>
      </div>

      {isLoading ? (
        <Spinner center />
      ) : hasError ? (
        <ErrorMsg message={hasError} lang={lang} />
      ) : items.length === 0 ? (
        <p className="text-center text-neutral-400 py-12 text-sm">
          {isMechanic
            ? (lang === 'ar' ? 'لا توجد خدمات مضافة' : 'No services added yet')
            : (lang === 'ar' ? 'لا توجد مركبات مضافة' : 'No vehicles added yet')}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="card p-4 flex items-center gap-4">
              {/* Icon */}
              {isMechanic ? (
                <div className="w-11 h-11 bg-primary-light text-primary rounded-xl flex items-center justify-center text-lg shrink-0">
                  <i className="fas fa-wrench" />
                </div>
              ) : (
                <div className="w-14 h-12 bg-neutral-100 rounded-xl shrink-0 flex items-center justify-center text-neutral-400">
                  <i className="fas fa-car text-xl" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">
                  {isMechanic
                    ? (item.serviceName || item.name)
                    : `${item.make} ${item.model} ${item.year}`}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {isMechanic
                    ? `${item.price} ${item.currency || t('sar')} · ${item.category}`
                    : `${item.licensePlate || ''} · ${item.fuelType || ''}`}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-1.5 border border-primary text-primary text-xs font-semibold rounded-lg hover:bg-primary-light transition-colors">
                  <i className="fas fa-edit me-1" />{t('edit')}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 border border-danger text-danger text-xs font-semibold rounded-lg hover:bg-danger-light transition-colors"
                >
                  <i className="fas fa-trash me-1" />{t('delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
