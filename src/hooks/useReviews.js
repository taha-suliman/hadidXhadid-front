import { useState, useEffect, useCallback } from 'react'
import { reviewsApi } from '../api'

export function useMechanicReviews(mechanicId, params = {}) {
  const [data, setData]           = useState([])
  const [pagination, setPagination] = useState(null)
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetch = useCallback(async () => {
    if (!mechanicId) return
    setLoading(true)
    try {
      const res = await reviewsApi.getMechanicReviews(mechanicId, params)
      setData(res.data ?? [])
      setPagination(res.pagination ?? null)
      setAverageRating(res.averageRating ?? 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [mechanicId])

  useEffect(() => { fetch() }, [fetch])

  const submitReview = async (reviewData) => {
    try {
      const res = await reviewsApi.createReview(reviewData)
      setData(prev => [res.data, ...prev])
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return { data, pagination, averageRating, loading, error, refetch: fetch, submitReview }
}
