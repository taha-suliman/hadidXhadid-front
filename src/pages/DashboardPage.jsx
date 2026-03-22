import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { useAuth } from '../contexts/AuthContext'
import { useAuthApi } from '../hooks/useAuthApi'
import { useMyVehicles } from '../hooks/useVehicles'
import { useServices } from '../hooks/useServices'
import { useAppointments } from '../hooks/useAppointments'
import { useToast } from '../components/ui/Feedback'

import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import OverviewTab      from '../components/dashboard/OverviewTab'
import ItemsTab         from '../components/dashboard/ItemsTab'
import AppointmentsTab  from '../components/dashboard/AppointmentsTab'
import ProfileTab       from '../components/dashboard/ProfileTab'
import SettingsTab      from '../components/dashboard/SettingsTab'

export default function DashboardPage() {
  const { t, lang }    = useLang()
  const { user }       = useAuth()
  const { updateProfile, loading: profileLoading } = useAuthApi()
  const navigate       = useNavigate()
  const { show, ToastEl } = useToast()

  const [active, setActive]           = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name:  user?.name  || '',
    phone: user?.phone || '',
    city:  user?.city  || '',
    bio:   user?.bio   || '',
  })

  if (!user) { navigate('/login'); return null }

  const isMechanic = user.userType === 'mechanic' || user.role === 'mechanic'

  const { data: vehicles,     loading: vLoading, error: vError, removeVehicle } = useMyVehicles()
  const { data: services,     loading: sLoading, error: sError, removeService  } = useServices(
    isMechanic ? { mechanicId: user.id } : {}
  )
  const { data: appointments, loading: aLoading, error: aError, updateStatus  } = useAppointments()

  const pendingCount   = appointments.filter(a => a.status === 'pending').length
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length

  const navItems = [
    { key: 'overview',     icon: 'fas fa-th-large',                          labelAr: 'نظرة عامة',                    labelEn: 'Overview'                   },
    { key: 'items',        icon: isMechanic ? 'fas fa-tools' : 'fas fa-car', labelAr: isMechanic ? 'خدماتي' : 'مركباتي', labelEn: isMechanic ? 'My Services' : 'My Vehicles' },
    { key: 'appointments', icon: 'fas fa-calendar-check',                    labelAr: 'مواعيدي',                      labelEn: 'Appointments'               },
    { key: 'profile',      icon: 'fas fa-user',                              labelAr: 'ملفي الشخصي',                  labelEn: 'My Profile'                 },
    { key: 'settings',     icon: 'fas fa-cog',                               labelAr: 'الإعدادات',                    labelEn: 'Settings'                   },
  ]

  const navLabel     = item => lang === 'ar' ? item.labelAr : item.labelEn
  const currentTitle = navLabel(navItems.find(n => n.key === active) || navItems[0])

  const handleSaveProfile = async () => {
    const result = await updateProfile(profileForm)
    if (result.success) show(t('profile_updated'), 'success')
    else show(result.message || (lang === 'ar' ? 'فشل التحديث' : 'Update failed'), 'error')
  }

  const sidebarProps = { active, setActive, setSidebarOpen, navItems, pendingCount }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-neutral-100">
      {ToastEl}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="w-64 bg-white h-full flex flex-col shadow-xl overflow-y-auto">
            <DashboardSidebar {...sidebarProps} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-e border-neutral-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <DashboardSidebar {...sidebarProps} />
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="bg-white border-b border-neutral-200 px-5 h-14 flex items-center gap-3 sticky top-16 z-10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 text-neutral-700 hover:bg-neutral-100 rounded-lg">
            <i className="fas fa-bars" />
          </button>
          <h1 className="font-bold text-base">{currentTitle}</h1>
        </div>

        <div className="p-5 sm:p-7 flex-1">
          {active === 'overview' && (
            <OverviewTab
              vehicles={vehicles} services={services}
              appointments={appointments} aLoading={aLoading}
              confirmedCount={confirmedCount} pendingCount={pendingCount}
              setActive={setActive}
            />
          )}
          {active === 'items' && (
            <ItemsTab
              vehicles={vehicles} services={services}
              vLoading={vLoading} sLoading={sLoading}
              vError={vError} sError={sError}
              removeVehicle={removeVehicle} removeService={removeService}
              show={show}
            />
          )}
          {active === 'appointments' && (
            <AppointmentsTab
              appointments={appointments}
              aLoading={aLoading} aError={aError}
              updateStatus={updateStatus} show={show}
            />
          )}
          {active === 'profile' && (
            <ProfileTab
              profileForm={profileForm} setProfileForm={setProfileForm}
              handleSaveProfile={handleSaveProfile} profileLoading={profileLoading}
            />
          )}
          {active === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}
