import { useState, useEffect, useCallback } from 'react'
import { mechanicsApi } from '../api'

export function useMechanics(initialParams = {}) {
  const [data, setData]         = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [params, setParams]     = useState({ page: 1, limit: 12, ...initialParams })

  const fetch = useCallback(async (p = params) => {
    setLoading(true)
    setError(null)
    try {
      // نحذف القيم الفارغة قبل الإرسال
      const clean = Object.fromEntries(Object.entries(p).filter(([, v]) => v !== '' && v != null))
      const res = await mechanicsApi.getMechanics(clean)
      setData(res.data ?? [])
      setPagination(res.pagination ?? null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch(params) }, [params])

  const updateFilters = (newFilters) =>
    setParams(p => ({ ...p, ...newFilters, page: 1 }))

  const nextPage = () =>
    setParams(p => ({ ...p, page: (p.page || 1) + 1 }))

  return { data, pagination, loading, error, updateFilters, nextPage, refetch: fetch }
}

export function useMechanicDetails(mechanicId) {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!mechanicId) return
    setLoading(true)
    mechanicsApi.getMechanicById(mechanicId)
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [mechanicId])

  return { data, loading, error }
}
