import api from './axiosInstance'

/**
 * GET /api/mechanics
 * جلب قائمة الميكانيكيين (Public)
 * @param {Object} params - { country, city, specialization, rating, page, limit, sort }
 */
export const getMechanics = (params = {}) =>
  api.get('/mechanics', { params })

/**
 * GET /api/mechanics/:mechanicId
 * جلب تفاصيل ميكانيكي محدد (Public)
 */
export const getMechanicById = (mechanicId) =>
  api.get(`/mechanics/${mechanicId}`)
