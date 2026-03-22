import { useState, useEffect, useCallback } from 'react'
import { vehiclesApi } from '../api'

export function useMyVehicles() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await vehiclesApi.getMyVehicles()
      setData(res.data ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const addVehicle = async (vehicleData) => {
    try {
      const res = await vehiclesApi.createVehicle(vehicleData)
      setData(prev => [...prev, res.data])
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const editVehicle = async (id, vehicleData) => {
    try {
      const res = await vehiclesApi.updateVehicle(id, vehicleData)
      setData(prev => prev.map(v => v.id === id ? res.data : v))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const removeVehicle = async (id) => {
    try {
      await vehiclesApi.deleteVehicle(id)
      setData(prev => prev.filter(v => v.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return { data, loading, error, refetch: fetch, addVehicle, editVehicle, removeVehicle }
}

export function useVehicleDetails(vehicleId) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!vehicleId) return
    setLoading(true)
    vehiclesApi.getVehicleById(vehicleId)
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [vehicleId])

  return { data, loading, error }
}
