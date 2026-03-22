import { useState, useEffect } from 'react'
import { locationApi } from '../api'

export function useCountries() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    locationApi.getCountries()
      .then(res => setData(res.data ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

export function useCities(countryId) {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!countryId) { setData([]); return }
    setLoading(true)
    locationApi.getCitiesByCountry(countryId)
      .then(res => setData(res.data ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [countryId])

  return { data, loading }
}
