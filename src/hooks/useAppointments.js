import { useState, useEffect, useCallback } from 'react'
import { appointmentsApi } from '../api'

export function useAppointments(params = {}) {
  const [data, setData]         = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await appointmentsApi.getAppointments(params)
      setData(res.data ?? [])
      setPagination(res.pagination ?? null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params)]) // eslint-disable-line

  useEffect(() => { fetch() }, [fetch])

  const book = async (appointmentData) => {
    try {
      const res = await appointmentsApi.createAppointment(appointmentData)
      return { success: true, data: res.data }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const updateStatus = async (id, status, notes = '') => {
    try {
      const res = await appointmentsApi.updateAppointmentStatus(id, status, notes)
      setData(prev => prev.map(a => a.id === id ? { ...a, status, ...res.data } : a))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return { data, pagination, loading, error, refetch: fetch, book, updateStatus }
}
