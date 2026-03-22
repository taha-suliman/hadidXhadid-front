import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'
import StarRating from '../ui/StarRating'

export default function ProfileTab({ profileForm, setProfileForm, handleSaveProfile, profileLoading }) {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const isMechanic = user?.userType === 'mechanic' || user?.role === 'mechanic'

  const fields = [
    { label: t('full_name'),                              key: 'name',  type: 'text' },
    { label: lang === 'ar' ? 'رقم الهاتف' : 'Phone',    key: 'phone', type: 'tel'  },
    { label: lang === 'ar' ? 'المدينة'    : 'City',      key: 'city',  type: 'text' },
  ]

  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-base mb-5">{t('my_profile')}</h2>

      <div className="card p-6 flex flex-col sm:flex-row gap-7">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-extrabold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="text-xs text-neutral-500">{user?.email}</div>
          {user?.rating && (
            <div className="flex items-center gap-1">
              <StarRating rating={parseFloat(user.rating)} size="text-sm" />
              <span className="text-xs text-neutral-500">({user.reviewCount || 0})</span>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-neutral-500 mb-1.5">{f.label}</label>
              <input
                type={f.type}
                value={profileForm[f.key]}
                onChange={e => setProfileForm(pf => ({ ...pf, [f.key]: e.target.value }))}
                className="input-field text-sm py-2.5"
              />
            </div>
          ))}

          {isMechanic && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-500 mb-1.5">
                {lang === 'ar' ? 'نبذة عنك' : 'Bio'}
              </label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={e => setProfileForm(pf => ({ ...pf, bio: e.target.value }))}
                className="input-field text-sm py-2.5 resize-none w-full"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <button
              onClick={handleSaveProfile}
              disabled={profileLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 disabled:opacity-60"
            >
              {profileLoading ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-save" />}
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
