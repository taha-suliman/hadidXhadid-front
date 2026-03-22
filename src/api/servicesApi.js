import api from './axiosInstance'

/**
 * GET /api/services
 * جلب قائمة الخدمات (Public)
 * @param {Object} params - { category, mechanicId, minPrice, maxPrice, page, limit }
 */
export const getServices = (params = {}) =>
  api.get('/services', { params })

/**
 * POST /api/services
 * إضافة خدمة جديدة (Protected - mechanic only)
 * @param {Object} data - { serviceName, category, description, price, currency, estimatedDuration, durationUnit }
 */
export const createService = (data) => api.post('/services', data)

/**
 * PUT /api/services/:serviceId
 * تحديث خدمة (Protected - mechanic only)
 */
export const updateService = (serviceId, data) =>
  api.put(`/services/${serviceId}`, data)

/**
 * DELETE /api/services/:serviceId
 * حذف خدمة (Protected - mechanic only)
 */
export const deleteService = (serviceId) =>
  api.delete(`/services/${serviceId}`)
