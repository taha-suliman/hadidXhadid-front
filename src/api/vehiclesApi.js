import api from './axiosInstance'

/**
 * GET /api/vehicles
 * جلب مركبات المستخدم الحالي (Protected)
 */
export const getMyVehicles = () => api.get('/vehicles')

/**
 * GET /api/vehicles/:vehicleId
 * جلب تفاصيل مركبة محددة (Protected)
 */
export const getVehicleById = (vehicleId) => api.get(`/vehicles/${vehicleId}`)

/**
 * POST /api/vehicles
 * إضافة مركبة جديدة (Protected - customer only)
 * @param {Object} data - { make, model, year, licensePlate, color, mileage, fuelType, description }
 */
export const createVehicle = (data) => api.post('/vehicles', data)

/**
 * PUT /api/vehicles/:vehicleId
 * تحديث بيانات مركبة (Protected)
 */
export const updateVehicle = (vehicleId, data) =>
  api.put(`/vehicles/${vehicleId}`, data)

/**
 * DELETE /api/vehicles/:vehicleId
 * حذف مركبة (Protected)
 */
export const deleteVehicle = (vehicleId) =>
  api.delete(`/vehicles/${vehicleId}`)
