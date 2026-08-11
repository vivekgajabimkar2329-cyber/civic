import api from '../../common/api/axios';

const adminApi = {
  // Dashboard
  getDashboard: () => api.get('/admin/dashboard'),
  
  // Complaints
  getComplaints: (params) => api.get('/admin/complaints', { params }),
  getComplaintById: (id) => api.get(`/admin/complaints/${id}`),
  updateComplaintStatus: (id, data) => api.put(`/admin/complaints/${id}/status`, data),
  assignOfficer: (data) => api.post('/admin/assign-officer', data),
  addComplaintNote: (id, data) => api.post(`/admin/complaints/${id}/notes`, data),
  closeComplaint: (id, data) => api.put(`/admin/complaints/${id}/close`, data),
  bulkUpdateComplaints: (data) => api.put('/admin/complaints/bulk-update', data),
  bulkAssignOfficer: (data) => api.post('/admin/complaints/bulk-assign', data),
  
  // Officers
  getOfficers: (params) => api.get('/admin/officers', { params }),
  getOfficerById: (id) => api.get(`/admin/officers/${id}`),
  
  // Analytics
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Notifications
  getNotifications: (params) => api.get('/admin/notifications', { params }),
  markNotificationRead: (id) => api.put(`/admin/notifications/${id}/read`),
  markAllNotificationsRead: () => api.put('/admin/notifications/read-all'),
  
  // Reports
  getReports: (params) => api.get('/admin/reports', { params }),
  generateReport: (data) => api.post('/admin/reports/generate', data),
  exportReport: (id, format) => api.get(`/admin/reports/${id}/export/${format}`, { responseType: 'blob' }),
  
  // AI Suggestions
  getAISuggestions: () => api.get('/admin/ai/suggestions'),
  getAIClassification: (complaintId) => api.get(`/admin/ai/classify/${complaintId}`),
  
  // Activities
  getRecentActivities: (params) => api.get('/admin/activities', { params }),
};

export default adminApi;

