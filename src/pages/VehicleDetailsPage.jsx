import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../contexts/LangContext'
import { vehicles } from '../data/mockData'
import StarRating from '../components/ui/StarRating'
import VehicleCard from '../components/pages/VehicleCard'

export default function VehicleDetailsPage() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const vehicle = vehicles.find(v => v.id === +id)
  const [activeImg, setActiveImg] = useState(0)

  if (!vehicle) return (
    <div className="text-center py-20 text-neutral-500">
      <i className="fas fa-car text-5xl text-neutral-200 block mb-4" />
      <p>{lang === 'ar' ? 'المركبة غير موجودة' : 'Vehicle not found'}</p>
    </div>
  )

  const allImages = vehicle.images?.length ? vehicle.images : [vehicle.image]
  const similar = vehicles.filter(v => v.id !== vehicle.id && v.brand === vehicle.brand).slice(0, 3)
  const specs = [
    { icon: 'fas fa-trademark', label: lang === 'ar' ? 'الماركة' : 'Brand', value: vehicle.brand },
    { icon: 'fas fa-car', label: lang === 'ar' ? 'الموديل' : 'Model', value: vehicle.model },
    { icon: 'fas fa-calendar', label: lang === 'ar' ? 'السنة' : 'Year', value: vehicle.year },
    { icon: 'fas fa-road', label: lang === 'ar' ? 'الكيلومترات' : 'Mileage', value: `${vehicle.km.toLocaleString()} ${t('km')}` },
    { icon: 'fas fa-gas-pump', label: t('fuel_type'), value: t(`fuel_${vehicle.fuel}`) },
    { icon: 'fas fa-cogs', label: t('transmission'), value: t(`trans_${vehicle.transmission}`) },
    { icon: 'fas fa-palette', label: t('color'), value: lang === 'ar' ? vehicle.color_ar : vehicle.color },
    { icon: 'fas fa-map-marker-alt', label: lang === 'ar' ? 'الموقع' : 'Location', value: lang === 'ar' ? vehicle.location_ar : vehicle.location },
  ]

  return (
    <div className="py-7 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 card text-sm font-semibold text-neutral-600 hover:border-primary hover:text-primary transition-all duration-200 mb-6">
          <i className="fas fa-arrow-right scale-x-[-1]" /> {t('back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7 items-start">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Gallery */}
            <div className="card overflow-hidden">
              <img src={allImages[activeImg]} alt="vehicle" className="w-full aspect-video object-cover" />
              {allImages.length > 1 && (
                <div className="flex gap-2 p-3">
                  {allImages.map((img, i) => (
                    <img key={i} src={img} alt="" onClick={() => setActiveImg(i)}
                      className={`w-20 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImg === i ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="card p-5">
              <h2 className="font-bold text-base mb-3">{t('detailed_desc')}</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {lang === 'ar' ? vehicle.description_ar : vehicle.description_en}
              </p>
            </div>

            {/* Specs */}
            <div className="card p-5">
              <h2 className="font-bold text-base mb-4">{t('specs')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-neutral-100 rounded-xl">
                    <div className="w-9 h-9 bg-primary-light text-primary rounded-lg flex items-center justify-center text-sm shrink-0">
                      <i className={s.icon} />
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-500">{s.label}</div>
                      <div className="text-sm font-semibold">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4 lg:sticky lg:top-20">
            {/* Price card */}
            <div className="card p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="font-cairo font-extrabold text-xl">{vehicle.brand} {vehicle.model}</h1>
                <span className="badge badge-primary shrink-0">{vehicle.year}</span>
              </div>
              <div className="text-3xl font-extrabold text-primary mb-2">
                {vehicle.price.toLocaleString()} <span className="text-sm font-medium text-neutral-500">{t('sar')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-5">
                <i className="fas fa-map-marker-alt text-danger text-xs" />
                {lang === 'ar' ? vehicle.location_ar : vehicle.location}
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200">
                  <i className="fas fa-phone" /> {lang === 'ar' ? 'اتصل بالبائع' : 'Call Seller'}
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary-light transition-all duration-200">
                  <i className="fas fa-comment" /> {lang === 'ar' ? 'رسالة' : 'Message'}
                </button>
              </div>
            </div>

            {/* Seller */}
            <div className="card p-5">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">{t('seller_info')}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                  {vehicle.seller.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold mb-0.5">{vehicle.seller.name}</div>
                  <StarRating rating={vehicle.seller.rating} />
                  <div className="text-xs text-neutral-500 mt-0.5">{vehicle.seller.rating}/5.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="section-title mb-5">{t('similar_vehicles')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(v => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
