import { useState, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { authApi } from '../api'

export function useAuthApi() {
  const { login: setUser, logout: clearUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ─── تسجيل الدخول ──────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authApi.login(email, password)
      const { token, ...userData } = res.data
      localStorage.setItem('authToken', token)
      localStorage.setItem('authUser', JSON.stringify(userData))
      setUser({ ...userData, name: userData.name })
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [setUser])

  // ─── التسجيل ────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authApi.register(formData)
      const { token, ...userData } = res.data
      localStorage.setItem('authToken', token)
      localStorage.setItem('authUser', JSON.stringify(userData))
      setUser({ ...userData, name: userData.name, role: userData.userType })
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [setUser])

  // ─── تسجيل الخروج ───────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    clearUser()
  }, [clearUser])

  // ─── تحديث الملف الشخصي ─────────────────────────────────
  const updateProfile = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authApi.updateProfile(data)
      // تحديث البيانات المحلية
      const stored = JSON.parse(localStorage.getItem('authUser') || '{}')
      const updated = { ...stored, ...res.data }
      localStorage.setItem('authUser', JSON.stringify(updated))
      setUser(u => ({ ...u, ...res.data }))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [setUser])

  return { login, register, logout, updateProfile, loading, error }
}
