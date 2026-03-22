import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../contexts/LangContext'
import { useAuth } from '../contexts/AuthContext'
import { useMechanicDetails } from '../hooks/useMechanics'
import { useMechanicReviews } from '../hooks/useReviews'
import { useAppointments } from '../hooks/useAppointments'
import { useMyVehicles } from '../hooks/useVehicles'
import StarRating from '../components/ui/StarRating'
import { Spinner, ErrorMsg, useToast } from '../components/ui/Feedback'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

export default function MechanicProfilePage() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { show, ToastEl } = useToast()

  const { data: mechanic, loading, error } = useMechanicDetails(id)
  const { data: reviews, averageRating, loading: revLoading } = useMechanicReviews(id, { limit: 5 })
  const { data: vehicles } = useMyVehicles()
  const { book } = useAppointments()

  const [activeTab, setActiveTab] = useState('about')

  // Booking form state
  const [date, setDate]         = useState('')
  const [time, setTime]         = useState('')
  const [serviceId, setServiceId] = useState('')
  const [vehicleId, setVehicleId] = useState('')
  const [notes, setNotes]       = useState('')
  const [booking, setBooking]   = useState(false)
  const [booked, setBooked]     = useState(false)

  if (loading) return <Spinner center />
  if (error || !mechanic) return (
    <div className="py-20"><ErrorMsg message={error} lang={lang} /></div>
  )

  const name       = lang === 'ar' ? mechanic.name      : mechanic.name
  const location   = lang === 'ar' ? (mechanic.city + (mechanic.country ? '، ' + mechanic.country : ''))
                                   : (mechanic.city + (mechanic.country ? ', ' + mechanic.country : ''))
  const specialties = mechanic.specialization || []
  const about      = mechanic.bio || ''
  const services   = mechanic.services || []

  const handleBook = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    if (!date || !time || !serviceId) return

    setBooking(true)
    const result = await book({
      mechanicId:      +id,
      serviceId:       +serviceId,
      vehicleId:       vehicleId ? +vehicleId : undefined,
      appointmentDate: date,
      appointmentTime: time,
      description:     notes,
      preferredLocation: 'workshop',
    })
    setBooking(false)

    if (result.success) {
      setBooked(true)
      show(t('booking_success'), 'success')
    } else {
      show(result.message || (lang === 'ar' ? 'فشل الحجز' : 'Booking failed'), 'error')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="py-7 pb-16">
      {ToastEl}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 card text-sm font-semibold text-neutral-600 hover:border-primary hover:text-primary transition-all duration-200 mb-6">
          <i className="fas fa-arrow-right scale-x-[-1]" /> {t('back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-7 items-start">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <img src={mechanic.profileImage || `https://ui-avatars.com/api/?name=${name}&background=007BFF&color=fff&size=96`}
                  alt={name} className="w-24 h-24 rounded-full object-cover border-4 border-primary-light shrink-0" />
                <div className="flex-1">
                  <h1 className="font-cairo text-2xl font-extrabold mb-1">{name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={mechanic.rating || 0} size="text-base" />
                    <span className="font-bold text-accent-dark">{(mechanic.rating || 0).toFixed(1)}</span>
                    <span className="text-sm text-neutral-500">({mechanic.reviewCount || 0} {t('reviews')})</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-neutral-500 mb-3">
                    {mechanic.yearsOfExperience && (
                      <span className="flex items-center gap-1.5">
                        <i className="fas fa-briefcase text-primary text-xs" />
                        {mechanic.yearsOfExperience} {t('years_exp')}
                      </span>
                    )}
                    {location && (
                      <span className="flex items-center gap-1.5">
                        <i className="fas fa-map-marker-alt text-danger text-xs" /> {location}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {specialties.map((s, i) => <span key={i} className="tag">{s}</span>)}
                  </div>
                </div>
              </div>

              {/* Working hours */}
              {mechanic.workingHours && (
                <div className="mt-5 pt-5 border-t border-neutral-100">
                  <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                    {lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(mechanic.workingHours).map(([day, hours]) => (
                      <div key={day} className="text-xs bg-neutral-100 rounded-lg px-2.5 py-1.5">
                        <div className="font-semibold capitalize text-neutral-700">{day.slice(0, 3)}</div>
                        <div className={hours === 'closed' ? 'text-danger' : 'text-neutral-500'}>
                          {hours === 'closed' ? (lang === 'ar' ? 'مغلق' : 'Closed') : hours}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="card overflow-hidden">
              <div className="flex border-b border-neutral-200">
                {[
                  { key: 'about',    label: lang === 'ar' ? 'نبذة' : 'About' },
                  { key: 'services', label: lang === 'ar' ? 'الخدمات' : 'Services' },
                  { key: 'reviews',  label: lang === 'ar' ? 'التقييمات' : 'Reviews' },
                ].map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-200 border-b-2 ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* About */}
                {activeTab === 'about' && (
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {about || (lang === 'ar' ? 'لا توجد نبذة متاحة' : 'No bio available')}
                  </p>
                )}

                {/* Services */}
                {activeTab === 'services' && (
                  <div className="space-y-3">
                    {services.length === 0 ? (
                      <p className="text-sm text-neutral-500 text-center py-4">
                        {lang === 'ar' ? 'لا توجد خدمات مضافة' : 'No services added yet'}
                      </p>
                    ) : services.map((svc, i) => (
                      <div key={svc.id || i} className="flex items-center gap-4 p-4 bg-neutral-100 rounded-xl">
                        <div className="w-10 h-10 bg-primary-light text-primary rounded-xl flex items-center justify-center text-base shrink-0">
                          <i className="fas fa-wrench" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm">{svc.serviceName || svc.name}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">{svc.description}</div>
                          {svc.estimatedDuration && (
                            <div className="text-xs text-neutral-400 mt-0.5">
                              <i className="fas fa-clock text-[10px]" /> {svc.estimatedDuration} {svc.durationUnit === 'minutes' ? (lang === 'ar' ? 'دقيقة' : 'min') : (lang === 'ar' ? 'ساعة' : 'hr')}
                            </div>
                          )}
                        </div>
                        <div className="font-extrabold text-primary text-base shrink-0">
                          {svc.price} <span className="text-xs font-medium text-neutral-500">{svc.currency || t('sar')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center gap-5 p-4 bg-neutral-100 rounded-xl mb-5">
                      <div className="text-5xl font-black text-neutral-900">{(averageRating || mechanic.rating || 0).toFixed(1)}</div>
                      <div>
                        <StarRating rating={averageRating || mechanic.rating || 0} size="text-xl" />
                        <div className="text-sm text-neutral-500 mt-1">{mechanic.reviewCount || 0} {t('reviews')}</div>
                      </div>
                    </div>

                    {revLoading ? <Spinner center /> : (
                      <div className="divide-y divide-neutral-100">
                        {reviews.length === 0 ? (
                          <p className="text-sm text-neutral-500 text-center py-6">
                            {lang === 'ar' ? 'لا توجد تقييمات بعد' : 'No reviews yet'}
                          </p>
                        ) : reviews.map(r => (
                          <div key={r.id} className="py-4">
                            <div className="flex items-center gap-2.5 mb-2">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                {(r.customerName || 'U').charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-semibold">{r.customerName}</div>
                                <StarRating rating={r.rating} size="text-xs" />
                              </div>
                              <span className="ms-auto text-xs text-neutral-400">
                                {new Date(r.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                              </span>
                            </div>
                            {r.comment && <p className="text-sm text-neutral-600 leading-relaxed">{r.comment}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — Booking */}
          <div className="lg:sticky lg:top-20" id="booking">
            <div className="card p-6">
              <h2 className="font-cairo font-bold text-lg flex items-center gap-2 mb-5">
                <i className="fas fa-calendar-check text-primary" /> {t('book_appointment')}
              </h2>

              {booked ? (
                <div className="text-center py-6">
                  <div className="text-6xl text-secondary mb-4"><i className="fas fa-check-circle" /></div>
                  <h3 className="font-bold text-lg text-secondary mb-2">{t('booking_success')}</h3>
                  <p className="text-sm text-neutral-600 mb-5">
                    {lang === 'ar' ? `تم حجز موعدك بتاريخ ${date} الساعة ${time}` : `Appointment on ${date} at ${time} confirmed`}
                  </p>
                  <button onClick={() => { setBooked(false); setDate(''); setTime(''); setServiceId(''); setVehicleId(''); setNotes('') }}
                    className="px-5 py-2 bg-primary-light text-primary font-semibold text-sm rounded-lg hover:bg-primary hover:text-white transition-all duration-200">
                    {lang === 'ar' ? 'حجز آخر' : 'Book Another'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-4">
                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{t('service_type')}</label>
                    <select required value={serviceId} onChange={e => setServiceId(e.target.value)} className="w-full input-field text-sm py-2.5">
                      <option value="">{lang === 'ar' ? 'اختر الخدمة' : 'Select service'}</option>
                      {services.map((svc, i) => (
                        <option key={svc.id || i} value={svc.id}>
                          {svc.serviceName || svc.name} — {svc.price} {svc.currency || t('sar')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle (if user logged in and has vehicles) */}
                  {user && vehicles.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        {lang === 'ar' ? 'اختر مركبتك' : 'Select Vehicle'}
                      </label>
                      <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="w-full input-field text-sm py-2.5">
                        <option value="">{lang === 'ar' ? 'اختر المركبة (اختياري)' : 'Select vehicle (optional)'}</option>
                        {vehicles.map(v => (
                          <option key={v.id} value={v.id}>{v.make} {v.model} {v.year}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{t('select_date')}</label>
                    <input type="date" required min={today} value={date} onChange={e => setDate(e.target.value)}
                      className="w-full input-field text-sm py-2.5" />
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2">{t('select_time')}</label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button type="button" key={slot} onClick={() => setTime(slot)}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${time === slot ? 'bg-primary text-white border-primary' : 'border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{t('notes')}</label>
                    <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                      placeholder={lang === 'ar' ? 'صف المشكلة أو الطلب...' : 'Describe the issue or request...'}
                      className="w-full input-field text-sm py-2.5 resize-none" />
                  </div>

                  {!user && (
                    <p className="text-xs text-neutral-500 bg-neutral-100 p-3 rounded-lg">
                      <i className="fas fa-info-circle text-primary me-1" />
                      {lang === 'ar' ? 'يجب تسجيل الدخول لإتمام الحجز' : 'You must be logged in to book'}
                      {' '}<button type="button" onClick={() => navigate('/login')} className="text-primary font-semibold underline">
                        {t('login')}
                      </button>
                    </p>
                  )}

                  <button type="submit" disabled={booking}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {booking
                      ? <><i className="fas fa-spinner fa-spin" /> {t('loading')}</>
                      : <><i className="fas fa-check" /> {t('confirm_booking')}</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
