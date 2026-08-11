import api from '../../common/api/axios';

const superAdminApi = {
  // Dashboard
  getDashboard: () => api.get('/api/v1/super-admin/dashboard'),

  // Departments
  getDepartments: (params) => api.get('/api/v1/departments', { params }),
  getDepartmentById: (id) => api.get(`/api/v1/departments/${id}`),
  createDepartment: (data) => api.post('/api/v1/departments', data),
  updateDepartment: (id, data) => api.put(`/api/v1/departments/${id}`, data),
  deleteDepartment: (id) => api.delete(`/api/v1/departments/${id}`),

  // Complaints
  getComplaints: (params) => api.get('/api/v1/complaints', { params }),
  getComplaintById: (id) => api.get(`/api/v1/complaints/${id}`),

  // Users
  getUsers: (params) => api.get('/api/v1/users', { params }),

  // Admins
  getAdmins: (params) => api.get('/api/v1/admins', { params }),
  createAdmin: (data) => api.post('/api/v1/admins', data),
  updateAdmin: (id, data) => api.put(`/api/v1/admins/${id}`, data),
  deleteAdmin: (id) => api.delete(`/api/v1/admins/${id}`),

  // Analytics
  getAnalytics: (params) => api.get('/api/v1/analytics', { params }),
  getDashboardStats: () => api.get('/api/v1/super-admin/dashboard/stats'),

  // Reports
  getReports: (params) => api.get('/api/v1/reports', { params }),
  generateReport: (data) => api.post('/api/v1/reports/generate', data),
  exportReport: (id, format) => api.get(`/api/v1/reports/${id}/export/${format}`, { responseType: 'blob' }),

  // System Health
  getSystemHealth: () => api.get('/api/v1/system-health'),

  // Audit Logs
  getAuditLogs: (params) => api.get('/api/v1/audit-logs', { params }),

  // Notifications
  getNotifications: (params) => api.get('/api/v1/notifications', { params }),
  markNotificationRead: (id) => api.put(`/api/v1/notifications/${id}/read`),
  markAllNotificationsRead: () => api.put('/api/v1/notifications/read-all'),

  // AI Analytics
  getAIAnalytics: () => api.get('/api/v1/analytics/ai'),
  getAIPrediction: () => api.get('/api/v1/analytics/ai/predictions'),
};

export default superAdminApi;
