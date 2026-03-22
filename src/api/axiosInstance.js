import axios from 'axios'

// ─── Base URL ──────────────────────────────────────────────
// غيّر هذا الـ URL لرابط السيرفر الخاص بيك
export const BASE_URL = import.meta.env.VITE_API_URL || '/http://localhost:5000/'

// ─── Axios Instance ────────────────────────────────────────
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// ─── Request Interceptor: إضافة JWT Token تلقائياً ─────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor: معالجة الأخطاء المركزية ─────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'حدث خطأ غير متوقع'

    // إذا انتهت صلاحية الـ Token → أعد التوجيه لصفحة الدخول
    if (status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
      window.location.href = '/login'
    }

    return Promise.reject({ status, message, data: error.response?.data })
  }
)

export default api
