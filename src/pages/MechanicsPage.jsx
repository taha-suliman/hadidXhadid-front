import { useLang } from '../contexts/LangContext'
import { useMechanics } from '../hooks/useMechanics'
import MechanicCard from '../components/pages/MechanicCard'
import { Spinner, ErrorMsg, EmptyState } from '../components/ui/Feedback'
import { useState } from 'react'

export default function MechanicsPage() {
  const { t, lang } = useLang()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data, pagination, loading, error, updateFilters, refetch } = useMechanics()
  const [localFilters, setLocalFilters] = useState({ specialization: '', rating: '', city: '' })

  const setF = (k, v) => {
    const updated = { ...localFilters, [k]: v }
    setLocalFilters(updated)
    // نرسل الفلاتر للـ API مباشرة
    updateFilters({ [k]: v || undefined })
  }

  const clearAll = () => {
    setLocalFilters({ specialization: '', rating: '', city: '' })
    updateFilters({ specialization: undefined, rating: undefined, city: undefined })
  }

  const hasFilters = Object.values(localFilters).some(Boolean)

  const SidebarContent = () => (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <i className="fas fa-filter text-primary" /> {t('filters')}
        </h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs font-semibold text-danger hover:underline">
            {lang === 'ar' ? 'مسح الكل' : 'Clear All'}
          </button>
        )}
      </div>

      {/* Specialization */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{t('filter_spec')}</label>
        <select className="w-full input-field text-sm py-2"
          value={localFilters.specialization} onChange={e => setF('specialization', e.target.value)}>
          <option value="">{t('all_specs')}</option>
          <option value="engine">{lang === 'ar' ? 'محركات' : 'Engines'}</option>
          <option value="transmission">{lang === 'ar' ? 'علبة سرعات' : 'Transmission'}</option>
          <option value="electrical">{lang === 'ar' ? 'كهرباء' : 'Electrical'}</option>
          <option value="air-conditioning">{lang === 'ar' ? 'تكييف' : 'AC Systems'}</option>
          <option value="brakes">{lang === 'ar' ? 'فرامل' : 'Brakes'}</option>
        </select>
      </div>

      {/* Min rating */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
          {lang === 'ar' ? 'الحد الأدنى للتقييم' : 'Min. Rating'}
        </label>
        <select className="w-full input-field text-sm py-2"
          value={localFilters.rating} onChange={e => setF('rating', e.target.value)}>
          <option value="">{lang === 'ar' ? 'الكل' : 'Any'}</option>
          <option value="3">3+ ★</option>
          <option value="4">4+ ★</option>
          <option value="4.5">4.5+ ★</option>
        </select>
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{t('filter_city')}</label>
        <input type="text" className="w-full input-field text-sm py-2"
          placeholder={lang === 'ar' ? 'أدخل المدينة' : 'Enter city'}
          value={localFilters.city}
          onChange={e => setF('city', e.target.value)} />
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="py-10 px-4" style={{ background: 'linear-gradient(135deg, #0a1628, #003580)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="font-cairo text-3xl font-extrabold text-white mb-1">{t('mechanics_directory')}</h1>
          <p className="text-white/60 text-sm">
            {loading ? '...' : `${pagination?.total ?? data.length} ${t('results_found')}`}
          </p>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="bg-black/40 flex-1" onClick={() => setSidebarOpen(false)} />
          <div className="w-72 bg-white h-full overflow-y-auto shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 flex gap-6 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 card sticky top-20">
          <SidebarContent />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 card text-sm font-semibold text-neutral-700 hover:border-primary hover:text-primary transition-colors">
              <i className="fas fa-filter text-xs" /> {t('filters')}
              {hasFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-neutral-500 font-medium">{t('sort_by')}:</span>
              {[
                { k: '-rating',     l: t('sort_rating') },
                { k: '-yearsOfExperience', l: t('sort_experienced') },
              ].map(s => (
                <button key={s.k} onClick={() => updateFilters({ sort: s.k })}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary transition-all duration-200">
                  {s.l}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <Spinner center />
          ) : error ? (
            <ErrorMsg message={error} onRetry={refetch} lang={lang} />
          ) : data.length === 0 ? (
            <EmptyState icon="fas fa-tools"
              title={lang === 'ar' ? 'لا يوجد ميكانيكيون' : 'No mechanics found'}
              subtitle={lang === 'ar' ? 'جرّب تعديل الفلاتر' : 'Try adjusting your filters'}
              action={hasFilters && (
                <button onClick={clearAll} className="btn-primary text-sm">
                  {lang === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
              )}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {data.map(m => <MechanicCard key={m.id} mechanic={m} />)}
              </div>

              {/* Pagination info */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <span className="text-sm text-neutral-500">
                    {lang === 'ar'
                      ? `صفحة ${pagination.page} من ${pagination.totalPages}`
                      : `Page ${pagination.page} of ${pagination.totalPages}`}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
