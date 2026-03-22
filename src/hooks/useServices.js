import { useState, useEffect, useCallback } from 'react'
import { servicesApi } from '../api'

export function useServices(params = {}) {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await servicesApi.getServices(params)
      setData(res.data ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params)]) // eslint-disable-line

  useEffect(() => { fetch() }, [fetch])

  const addService = async (serviceData) => {
    try {
      const res = await servicesApi.createService(serviceData)
      setData(prev => [...prev, res.data])
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const editService = async (id, serviceData) => {
    try {
      const res = await servicesApi.updateService(id, serviceData)
      setData(prev => prev.map(s => s.id === id ? res.data : s))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const removeService = async (id) => {
    try {
      await servicesApi.deleteService(id)
      setData(prev => prev.filter(s => s.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return { data, loading, error, refetch: fetch, addService, editService, removeService }
}
