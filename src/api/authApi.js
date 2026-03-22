import api from './axiosInstance'

/**
 * POST /api/auth/register
 * تسجيل مستخدم جديد
 */
export const register = (data) =>
  api.post('/auth/register', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    userType: data.role === 'mechanic' ? 'mechanic' : 'customer',
    country: data.country || 'Sudan',
    city: data.city || 'Khartoum',
  })

/**
 * POST /api/auth/login
 * تسجيل الدخول
 */
export const login = (email, password) =>
  api.post('/auth/login', { email, password })

/**
 * GET /api/auth/me
 * جلب بيانات المستخدم الحالي (Protected)
 */
export const getMe = () => api.get('/auth/me')

/**
 * PUT /api/auth/profile
 * تحديث الملف الشخصي (Protected)
 */
export const updateProfile = (data) => api.put('/auth/profile', data)
