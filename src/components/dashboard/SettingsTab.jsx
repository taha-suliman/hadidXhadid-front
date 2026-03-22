import { useLang } from '../../contexts/LangContext'

export default function SettingsTab() {
  const { lang } = useLang()

  const items = [
    {
      icon:   'fas fa-bell',
      label:  lang === 'ar' ? 'الإشعارات'  : 'Notifications',
      desc:   lang === 'ar' ? 'تحكم في تفضيلات الإشعارات' : 'Manage notification preferences',
      danger: false,
    },
    {
      icon:   'fas fa-shield-alt',
      label:  lang === 'ar' ? 'الأمان'     : 'Security',
      desc:   lang === 'ar' ? 'تغيير كلمة المرور'         : 'Change your password',
      danger: false,
    },
    {
      icon:   'fas fa-globe',
      label:  lang === 'ar' ? 'اللغة'      : 'Language',
      desc:   lang === 'ar' ? 'تغيير لغة التطبيق'         : 'Change app language',
      danger: false,
    },
    {
      icon:   'fas fa-trash-alt',
      label:  lang === 'ar' ? 'حذف الحساب' : 'Delete Account',
      desc:   lang === 'ar' ? 'حذف حسابك نهائياً'          : 'Permanently delete your account',
      danger: true,
    },
  ]

  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-base mb-5">{lang === 'ar' ? 'الإعدادات' : 'Settings'}</h2>

      <div className="space-y-3 max-w-lg">
        {items.map((item, i) => (
          <div
            key={i}
            className={`card p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all duration-200
              ${item.danger ? 'hover:border-danger' : 'hover:border-primary'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0
              ${item.danger ? 'bg-danger-light text-danger' : 'bg-primary-light text-primary'}`}
            >
              <i className={item.icon} />
            </div>
            <div className="flex-1">
              <div className={`text-sm font-semibold ${item.danger ? 'text-danger' : ''}`}>{item.label}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{item.desc}</div>
            </div>
            <i className="fas fa-chevron-left scale-x-[-1] text-neutral-400 text-xs" />
          </div>
        ))}
      </div>
    </div>
  )
}
