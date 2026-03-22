import { useState, useMemo } from 'react'
import { useLang } from '../contexts/LangContext'
import { vehicles } from '../data/mockData'
import VehicleCard from '../components/pages/VehicleCard'

const brands = ['Toyota', 'Hyundai', 'BMW', 'Kia', 'Mercedes', 'Honda']
const cities = [{ en: 'Riyadh', ar: 'الرياض' }, { en: 'Jeddah', ar: 'جدة' }, { en: 'Dammam', ar: 'الدمام' }]

export default function VehiclesPage() {
  const { t, lang } = useLang()
  const [sort, setSort] = useState('newest')
  const [filters, setFilters] = useState({ brand: '', city: '', fuel: '', transmission: '', minPrice: '', maxPrice: '' })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }))
  const hasFilters = Object.values(filters).some(Boolean)
  const clearFilters = () => setFilters({ brand: '', city: '', fuel: '', transmission: '', minPrice: '', maxPrice: '' })

  const filtered = useMemo(() => {
    let list = [...vehicles]
    if (filters.brand) list = list.filter(v => v.brand === filters.brand)
    if (filters.city) list = list.filter(v => v.location === filters.city)
    if (filters.fuel) list = list.filter(v => v.fuel === filters.fuel)
    if (filters.transmission) list = list.filter(v => v.transmission === filters.transmission)
    if (filters.minPrice) list = list.filter(v => v.price >= +filters.minPrice)
    if (filters.maxPrice) list = list.filter(v => v.price <= +filters.maxPrice)
    if (sort === 'price_low') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_high') list.sort((a, b) => b.price - a.price)
    else list.sort((a, b) => b.year - a.year)
    return list
  }, [filters, sort])

  const selectCls = "w-full input-field text-sm py-2"

  const SidebarContent = () => (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <i className="fas fa-filter text-primary" /> {t('filters')}
        </h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs font-semibold text-danger hover:underline">{lang === 'ar' ? 'مسح الكل' : 'Clear All'}</button>
        )}
      </div>

      {[
        { label: t('filter_brand'), key: 'brand', opts: brands.map(b => ({ v: b, l: b })), placeholder: t('all_brands') },
        { label: t('filter_city'), key: 'city', opts: cities.map(c => ({ v: c.en, l: lang === 'ar' ? c.ar : c.en })), placeholder: t('all_cities') },
        { label: t('fuel_type'), key: 'fuel', opts: ['gasoline', 'diesel', 'electric', 'hybrid'].map(f => ({ v: f, l: t(`fuel_${f}`) })), placeholder: lang === 'ar' ? 'الكل' : 'All' },
        { label: t('transmission'), key: 'transmission', opts: [{ v: 'auto', l: t('trans_auto') }, { v: 'manual', l: t('trans_manual') }], placeholder: lang === 'ar' ? 'الكل' : 'All' },
      ].map(({ label, key, opts, placeholder }) => (
        <div key={key} className="mb-4">
          <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{label}</label>
          <select className={selectCls} value={filters[key]} onChange={e => setF(key, e.target.value)}>
            <option value="">{placeholder}</option>
            {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{t('price_range')}</label>
        <div className="flex gap-2">
          <input type="number" placeholder={t('min_price')} value={filters.minPrice} onChange={e => setF('minPrice', e.target.value)}
            className="input-field text-xs py-2 w-1/2" />
          <input type="number" placeholder={t('max_price')} value={filters.maxPrice} onChange={e => setF('maxPrice', e.target.value)}
            className="input-field text-xs py-2 w-1/2" />
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Page header */}
      <div className="py-10 px-4" style={{ background: 'linear-gradient(135deg, #0a1628, #003580)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="font-cairo text-3xl font-extrabold text-white mb-1">{t('vehicles_marketplace')}</h1>
          <p className="text-white/60 text-sm">{filtered.length} {t('results_found')}</p>
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
        <aside className="hidden lg:block w-60 shrink-0 card sticky top-20">
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
                { k: 'newest', l: t('sort_newest') },
                { k: 'price_low', l: t('sort_price_low') },
                { k: 'price_high', l: t('sort_price_high') },
              ].map(s => (
                <button key={s.k}
                  onClick={() => setSort(s.k)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${sort === s.k ? 'bg-primary text-white border-primary' : 'border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary'}`}>
                  {s.l}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              <i className="fas fa-car text-5xl text-neutral-200 block mb-4" />
              <p className="text-base mb-4">{t('no_results')}</p>
              <button onClick={clearFilters} className="btn-primary text-sm">{lang === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(v => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
