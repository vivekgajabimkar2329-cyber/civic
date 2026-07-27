export const initialComplaints = [
  { id: 'C-1245', title: 'Road damage near MG Road', department: 'Roads & Infrastructure', status: 'Pending', date: 'May 20, 2025', priority: 'High', citizen: 'John Doe', description: 'Large pothole causing traffic issues.' },
  { id: 'C-1246', title: 'Water leakage in Block A', department: 'Water Supply', status: 'In Progress', date: 'May 19, 2025', priority: 'Medium', citizen: 'Jane Smith', description: 'Continuous water leakage from main pipe.' },
  { id: 'C-1247', title: 'Garbage not collected', department: 'Sanitation', status: 'Resolved', date: 'May 18, 2025', priority: 'Low', citizen: 'Alex Johnson', description: 'Garbage bins are overflowing.' },
  { id: 'C-1248', title: 'Street light not working', department: 'Electricity', status: 'Pending', date: 'May 20, 2025', priority: 'Medium', citizen: 'Sarah Williams', description: 'Street light at 5th avenue is broken.' },
  { id: 'C-1249', title: 'Illegal parking', department: 'Traffic', status: 'Resolved', date: 'May 15, 2025', priority: 'Low', citizen: 'Michael Brown', description: 'Cars parked in no parking zone.' }
];

export const initialDepartments = [
  { id: 'D-01', name: 'Roads & Infrastructure', head: 'Robert Taylor', activeOfficers: 45, totalComplaints: 4320 },
  { id: 'D-02', name: 'Water Supply', head: 'Maria Garcia', activeOfficers: 32, totalComplaints: 3100 },
  { id: 'D-03', name: 'Sanitation', head: 'James Wilson', activeOfficers: 56, totalComplaints: 2450 },
  { id: 'D-04', name: 'Electricity', head: 'Linda Martinez', activeOfficers: 28, totalComplaints: 1230 },
];

export const initialOfficers = [
  { id: 'O-101', name: 'Mark Davis', department: 'Roads & Infrastructure', status: 'Online', role: 'Inspector', rating: 4.8 },
  { id: 'O-102', name: 'Emily Clark', department: 'Water Supply', status: 'Offline', role: 'Field Officer', rating: 4.5 },
  { id: 'O-103', name: 'David Lee', department: 'Sanitation', status: 'Online', role: 'Supervisor', rating: 4.9 },
  { id: 'O-104', name: 'Susan Hall', department: 'Electricity', status: 'Online', role: 'Technician', rating: 4.6 },
];

export const initialCitizens = [
  { id: 'U-001', name: 'John Doe', email: 'john@example.com', phone: '555-0101', complaintsFiled: 3, status: 'Active', joinDate: 'Jan 12, 2024' },
  { id: 'U-002', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', complaintsFiled: 1, status: 'Active', joinDate: 'Feb 05, 2024' },
  { id: 'U-003', name: 'Alex Johnson', email: 'alex@example.com', phone: '555-0103', complaintsFiled: 5, status: 'Suspended', joinDate: 'Mar 20, 2024' },
];

export const initialAuditLogs = [
  { id: 'L-01', user: 'Sarah Jenkins', action: 'Updated Settings', date: 'May 20, 2025 10:30 AM', ip: '192.168.1.1' },
  { id: 'L-02', user: 'System', action: 'Automated Backup', date: 'May 20, 2025 02:00 AM', ip: 'localhost' },
  { id: 'L-03', user: 'Mark Davis', action: 'Resolved C-1247', date: 'May 19, 2025 04:15 PM', ip: '192.168.1.42' },
];

// Dashboard Chart Data
export const weeklyChartData = [
  { name: 'Mon', value: 25 },
  { name: 'Tue', value: 50 },
  { name: 'Wed', value: 40 },
  { name: 'Thu', value: 72 }, // Highlighting this one as 72 in the design
  { name: 'Fri', value: 60 },
  { name: 'Sat', value: 38 },
  { name: 'Sun', value: 55 },
];

export const categoryData = [
  { name: 'Roads & Infrastructure', value: 35, color: '#3b82f6' }, // blue
  { name: 'Water Supply', value: 25, color: '#8b5cf6' }, // purple
  { name: 'Sanitation', value: 20, color: '#10b981' }, // green
  { name: 'Electricity', value: 10, color: '#f97316' }, // orange
  { name: 'Others', value: 10, color: '#ef4444' }, // red
];

// Citizen Mock Data
export const citizenProfile = {
  id: 'U-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 555-0101',
  address: '123 Main St, Springfield',
  joined: 'January 2024',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=003078&color=fff',
  stats: {
    totalReported: 12,
    resolved: 8,
    inProgress: 3,
    pending: 1
  }
};

export const citizenNotifications = [
  { id: 'N-1', title: 'Complaint Resolved', message: 'Your complaint C-1234 has been marked as resolved.', date: '2 hours ago', read: false, type: 'success' },
  { id: 'N-2', title: 'New Announcement', message: 'Scheduled maintenance for water supply on Friday.', date: '1 day ago', read: true, type: 'info' },
  { id: 'N-3', title: 'Update on C-1245', message: 'An officer has been assigned to your complaint.', date: '2 days ago', read: true, type: 'update' }
];

export const nearbyComplaintsData = [
  { id: 'NC-1', title: 'Broken Sidewalk', category: 'Infrastructure', distance: '0.2 miles', status: 'Pending', lat: 37.7749, lng: -122.4194 },
  { id: 'NC-2', title: 'Streetlight Out', category: 'Electricity', distance: '0.5 miles', status: 'In Progress', lat: 37.7750, lng: -122.4200 },
  { id: 'NC-3', title: 'Graffiti on Park Wall', category: 'Sanitation', distance: '0.8 miles', status: 'Resolved', lat: 37.7730, lng: -122.4180 }
];
