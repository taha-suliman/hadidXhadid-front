import api from './axiosInstance'

/**
 * POST /api/reviews
 * إضافة تقييم (Protected - customer only)
 * @param {Object} data - { mechanicId, appointmentId, rating, comment }
 */
export const createReview = (data) => api.post('/reviews', data)

/**
 * GET /api/reviews/mechanic/:mechanicId
 * جلب تقييمات ميكانيكي محدد (Public)
 * @param {number} mechanicId
 * @param {Object} params - { page, limit }
 */
export const getMechanicReviews = (mechanicId, params = {}) =>
  api.get(`/reviews/mechanic/${mechanicId}`, { params })
