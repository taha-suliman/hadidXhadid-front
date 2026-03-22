import api from './axiosInstance'

/**
 * GET /api/countries
 * جلب قائمة الدول (Public)
 */
export const getCountries = () => api.get('/countries')

/**
 * GET /api/countries/:countryId/cities
 * جلب مدن دولة محددة (Public)
 */
export const getCitiesByCountry = (countryId) =>
  api.get(`/countries/${countryId}/cities`)

/**
 * GET /api/search
 * البحث المتقدم (Public)
 * @param {Object} params - { query, type, country, city, page, limit }
 * type: 'mechanics' | 'services' | 'vehicles'
 */
export const advancedSearch = (params) => api.get('/search', { params })
