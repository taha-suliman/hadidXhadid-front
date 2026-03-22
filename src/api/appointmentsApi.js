import api from './axiosInstance'

/**
 * POST /api/appointments
 * حجز موعد جديد (Protected - customer only)
 * @param {Object} data - { mechanicId, serviceId, vehicleId, appointmentDate, appointmentTime, description, preferredLocation }
 */
export const createAppointment = (data) =>
  api.post('/appointments', data)

/**
 * GET /api/appointments
 * جلب قائمة المواعيد (Protected)
 * @param {Object} params - { status, page, limit }
 */
export const getAppointments = (params = {}) =>
  api.get('/appointments', { params })

/**
 * PUT /api/appointments/:appointmentId/status
 * تحديث حالة الموعد (Protected)
 * @param {number} appointmentId
 * @param {string} status - 'confirmed' | 'completed' | 'cancelled'
 * @param {string} [notes]
 */
export const updateAppointmentStatus = (appointmentId, status, notes = '') =>
  api.put(`/appointments/${appointmentId}/status`, { status, notes })
