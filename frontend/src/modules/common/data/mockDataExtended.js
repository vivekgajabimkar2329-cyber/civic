// Extended mock data for the Civic AI Department Admin Dashboard

export const kpiData = [
  { id: 1, title: 'Total Complaints', value: '12,450', change: '+12.5%', isUp: true, icon: 'FileText', color: '#3b82f6', bg: '#eff6ff', chartData: [20, 35, 28, 45, 38, 52, 45] },
  { id: 2, title: 'Resolved Today', value: '84', change: '+7.3%', isUp: true, icon: 'CheckCircle', color: '#10b981', bg: '#ecfdf5', chartData: [10, 15, 12, 20, 18, 22, 25] },
  { id: 3, title: 'Pending Complaints', value: '3,120', change: '-8.2%', isUp: false, icon: 'Clock', color: '#f59e0b', bg: '#fffbeb', chartData: [40, 35, 38, 30, 32, 28, 25] },
  { id: 4, title: 'High Priority', value: '486', change: '+3.1%', isUp: true, icon: 'AlertTriangle', color: '#ef4444', bg: '#fef2f2', chartData: [8, 12, 10, 15, 13, 11, 14] },
  { id: 5, title: 'Field Officers', value: '156', change: '+5.2%', isUp: true, icon: 'Users', color: '#8b5cf6', bg: '#f5f3ff', chartData: [120, 125, 130, 140, 145, 150, 156] },
  { id: 6, title: 'Avg Resolution Time', value: '2.4 days', change: '-12.5%', isUp: true, icon: 'Timer', color: '#0ea5e9', bg: '#f0f9ff', chartData: [4.5, 4.2, 3.8, 3.5, 3.2, 2.8, 2.4] },
  { id: 7, title: 'Citizen Satisfaction', value: '94.2%', change: '+2.1%', isUp: true, icon: 'Smile', color: '#10b981', bg: '#ecfdf5', chartData: [85, 87, 88, 90, 91, 92, 94.2] },
  { id: 8, title: 'Monthly Performance', value: '87.6%', change: '+4.3%', isUp: true, icon: 'TrendingUp', color: '#2563eb', bg: '#eff6ff', chartData: [72, 75, 78, 82, 84, 86, 87.6] },
];

export const allComplaints = [
  { id: 'C-1245', citizen: 'Rahul Sharma', category: 'Roads & Infrastructure', priority: 'High', status: 'Pending', officer: 'Mark Davis', dateReported: 'May 20, 2025', expectedCompletion: 'May 27, 2025', description: 'Large pothole on MG Road causing traffic congestion and vehicle damage. Needs immediate repair.' },
  { id: 'C-1246', citizen: 'Priya Patel', category: 'Water Supply', priority: 'Medium', status: 'In Progress', officer: 'Emily Clark', dateReported: 'May 19, 2025', expectedCompletion: 'May 25, 2025', description: 'Water leakage from main pipeline in Block A residential area. Water wastage for 3 days.' },
  { id: 'C-1247', citizen: 'Amit Singh', category: 'Sanitation', priority: 'Low', status: 'Resolved', officer: 'David Lee', dateReported: 'May 18, 2025', expectedCompletion: 'May 22, 2025', description: 'Garbage bins overflowing in Sector 12 market area for a week.' },
  { id: 'C-1248', citizen: 'Sneha Reddy', category: 'Electricity', priority: 'Medium', status: 'Pending', officer: 'Susan Hall', dateReported: 'May 20, 2025', expectedCompletion: 'May 26, 2025', description: 'Street light at 5th Avenue junction not working since 3 days. Safety concern.' },
  { id: 'C-1249', citizen: 'Vikram Joshi', category: 'Traffic', priority: 'Low', status: 'Resolved', officer: 'Robert Chen', dateReported: 'May 15, 2025', expectedCompletion: 'May 19, 2025', description: 'Illegal parking near city center causing traffic jams during peak hours.' },
  { id: 'C-1250', citizen: 'Ananya Gupta', category: 'Roads & Infrastructure', priority: 'High', status: 'In Progress', officer: 'Mark Davis', dateReported: 'May 21, 2025', expectedCompletion: 'May 28, 2025', description: 'Broken footpath near school zone dangerous for children walking to school.' },
  { id: 'C-1251', citizen: 'Arjun Nair', category: 'Water Supply', priority: 'Critical', status: 'Pending', officer: 'Unassigned', dateReported: 'May 22, 2025', expectedCompletion: 'May 24, 2025', description: 'Main water pipe burst in downtown area. Hundreds without water supply.' },
  { id: 'C-1252', citizen: 'Divya Kaur', category: 'Sanitation', priority: 'Medium', status: 'Pending', officer: 'Unassigned', dateReported: 'May 21, 2025', expectedCompletion: 'May 26, 2025', description: 'Stagnant water in open drain causing mosquito breeding and foul smell.' },
  { id: 'C-1253', citizen: 'Karan Mehta', category: 'Electricity', priority: 'High', status: 'In Progress', officer: 'Susan Hall', dateReported: 'May 19, 2025', expectedCompletion: 'May 25, 2025', description: 'Frequent power fluctuations in residential colony damaging appliances.' },
  { id: 'C-1254', citizen: 'Neha Verma', category: 'Roads & Infrastructure', priority: 'Low', status: 'Resolved', officer: 'James Wilson', dateReported: 'May 14, 2025', expectedCompletion: 'May 18, 2025', description: 'Missing road sign at T-junction causing confusion for drivers.' },
];

export const officersData = [
  { id: 'O-101', name: 'Mark Davis', department: 'Roads & Infrastructure', status: 'Online', role: 'Senior Inspector', rating: 4.8, assigned: 12, completed: 45, performance: 94, avgResolution: '1.8 days', avatar: 'https://ui-avatars.com/api/?name=Mark+Davis&background=2563eb&color=fff&bold=true' },
  { id: 'O-102', name: 'Emily Clark', department: 'Water Supply', status: 'Offline', role: 'Field Officer', rating: 4.5, assigned: 8, completed: 32, performance: 88, avgResolution: '2.2 days', avatar: 'https://ui-avatars.com/api/?name=Emily+Clark&background=0f766e&color=fff&bold=true' },
  { id: 'O-103', name: 'David Lee', department: 'Sanitation', status: 'Online', role: 'Supervisor', rating: 4.9, assigned: 15, completed: 58, performance: 97, avgResolution: '1.5 days', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=10b981&color=fff&bold=true' },
  { id: 'O-104', name: 'Susan Hall', department: 'Electricity', status: 'Online', role: 'Senior Technician', rating: 4.6, assigned: 10, completed: 38, performance: 91, avgResolution: '2.0 days', avatar: 'https://ui-avatars.com/api/?name=Susan+Hall&background=f59e0b&color=fff&bold=true' },
  { id: 'O-105', name: 'Robert Chen', department: 'Traffic', status: 'Away', role: 'Traffic Inspector', rating: 4.7, assigned: 6, completed: 28, performance: 93, avgResolution: '1.6 days', avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=8b5cf6&color=fff&bold=true' },
  { id: 'O-106', name: 'James Wilson', department: 'Roads & Infrastructure', status: 'Online', role: 'Field Officer', rating: 4.4, assigned: 9, completed: 25, performance: 86, avgResolution: '2.5 days', avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=ef4444&color=fff&bold=true' },
];

export const aiSuggestions = [
  { id: 'AI-1', type: 'classification', title: 'Complaint Classification', complaint: 'C-1251', category: 'Water Supply Emergency', confidence: 96, description: 'AI identifies this as a critical water supply emergency requiring immediate attention.', recommendation: 'Assign to Water Supply emergency response team.' },
  { id: 'AI-2', type: 'priority', title: 'Priority Prediction', complaint: 'C-1250', priority: 'High', confidence: 92, description: 'AI predicts high priority based on location (school zone) and complaint type (infrastructure hazard).', recommendation: 'Escalate to senior inspector for rapid response.' },
  { id: 'AI-3', type: 'duplicate', title: 'Duplicate Detection', complaint: 'C-1248', duplicateOf: 'C-1239', confidence: 89, description: 'This complaint appears to be a duplicate of C-1239 (Street light issue on 5th Avenue reported on May 18).', recommendation: 'Merge with existing complaint C-1239.' },
  { id: 'AI-4', type: 'officer', title: 'Officer Recommendation', complaint: 'C-1251', recommendedOfficer: 'Susan Hall', confidence: 94, description: 'Susan Hall has the highest success rate for water emergencies in this zone (97% resolution rate).', recommendation: 'Auto-assign to Susan Hall for immediate dispatch.' },
  { id: 'AI-5', type: 'urgency', title: 'Urgency Score', complaint: 'C-1249', urgencyScore: 72, description: 'Complaint has moderate urgency. Traffic issues in this area typically resolve within 48 hours.', recommendation: 'Schedule for next available traffic inspector.' },
  { id: 'AI-6', type: 'insight', title: 'Smart Recommendation', complaint: 'System', confidence: 95, description: 'Complaints in Sector 12 have increased 40% this month. Consider deploying additional sanitation staff.', recommendation: 'Increase field officers in Sector 12 by 2.' },
];

export const recentActivities = [
  { id: 'A-1', type: 'assigned', message: 'Complaint C-1246 was assigned to Emily Clark', time: '2 minutes ago', user: 'System', icon: 'UserPlus' },
  { id: 'A-2', type: 'updated', message: 'Complaint C-1247 status changed to Resolved', time: '15 minutes ago', user: 'David Lee', icon: 'CheckCircle' },
  { id: 'A-3', type: 'closed', message: 'Complaint C-1249 was closed successfully', time: '1 hour ago', user: 'Robert Chen', icon: 'XCircle' },
  { id: 'A-4', type: 'new', message: 'New complaint C-1251 filed - Critical water pipe burst', time: '2 hours ago', user: 'Citizen Portal', icon: 'FilePlus' },
  { id: 'A-5', type: 'ai', message: 'AI identified duplicate complaints C-1248 and C-1239', time: '3 hours ago', user: 'AI System', icon: 'Brain' },
  { id: 'A-6', type: 'officer', message: 'Officer Mark Davis completed 2 complaints today', time: '4 hours ago', user: 'System', icon: 'UserCheck' },
  { id: 'A-7', type: 'alert', message: 'Complaint C-1245 deadline approaching - Due in 5 days', time: '5 hours ago', user: 'System Alert', icon: 'AlertTriangle' },
  { id: 'A-8', type: 'system', message: 'Weekly backup completed successfully', time: '6 hours ago', user: 'System', icon: 'Shield' },
];

export const notificationsData = [
  { id: 'N-1', title: 'New Complaint Filed', message: 'Citizen Arjun Nair filed a critical water pipe burst complaint (C-1251).', time: '2 hours ago', read: false, type: 'alert' },
  { id: 'N-2', title: 'Complaint Escalated', message: 'Complaint C-1245 has been escalated due to high priority status.', time: '3 hours ago', read: false, type: 'warning' },
  { id: 'N-3', title: 'Deadline Approaching', message: 'Complaint C-1246 is due for completion in 3 days.', time: '5 hours ago', read: false, type: 'info' },
  { id: 'N-4', title: 'Citizen Reply Received', message: 'Priya Patel replied to complaint C-1246 with additional photos.', time: '6 hours ago', read: true, type: 'message' },
  { id: 'N-5', title: 'System Maintenance', message: 'Scheduled system maintenance on Saturday 2:00 AM - 4:00 AM.', time: '1 day ago', read: true, type: 'system' },
  { id: 'N-6', title: 'Department Alert', message: 'Roads department reported 20% increase in pothole complaints this week.', time: '2 days ago', read: true, type: 'alert' },
  { id: 'N-7', title: 'Weekly Report Ready', message: 'Your weekly department performance report is now available.', time: '2 days ago', read: true, type: 'success' },
  { id: 'N-8', title: 'New Officer Assigned', message: 'Officer James Wilson has been assigned to Roads & Infrastructure.', time: '3 days ago', read: true, type: 'info' },
];

export const reportsData = [
  { id: 'R-1', title: 'Daily Complaint Report', type: 'Daily', date: 'May 22, 2025', status: 'Ready', format: 'PDF' },
  { id: 'R-2', title: 'Weekly Department Performance', type: 'Weekly', date: 'May 18-24, 2025', status: 'Generating', format: 'PDF' },
  { id: 'R-3', title: 'Monthly Analytics Summary', type: 'Monthly', date: 'April 2025', status: 'Ready', format: 'Excel' },
  { id: 'R-4', title: 'Officer Performance Report', type: 'Monthly', date: 'April 2025', status: 'Ready', format: 'PDF' },
  { id: 'R-5', title: 'Citizen Satisfaction Survey', type: 'Quarterly', date: 'Q1 2025', status: 'Draft', format: 'Excel' },
];

export const chartData = {
  complaintsOverTime: [
    { month: 'Jan', complaints: 850, resolved: 720 },
    { month: 'Feb', complaints: 920, resolved: 780 },
    { month: 'Mar', complaints: 1080, resolved: 910 },
    { month: 'Apr', complaints: 960, resolved: 850 },
    { month: 'May', complaints: 1120, resolved: 950 },
  ],
  complaintsByCategory: [
    { name: 'Roads & Infrastructure', value: 4350, color: '#3b82f6' },
    { name: 'Water Supply', value: 3120, color: '#0f766e' },
    { name: 'Sanitation', value: 2450, color: '#10b981' },
    { name: 'Electricity', value: 1230, color: '#f59e0b' },
    { name: 'Traffic', value: 890, color: '#8b5cf6' },
    { name: 'Others', value: 410, color: '#ef4444' },
  ],
  statusDistribution: [
    { name: 'Resolved', value: 7490, color: '#10b981' },
    { name: 'In Progress', value: 1840, color: '#3b82f6' },
    { name: 'Pending', value: 3120, color: '#f59e0b' },
  ],
  weeklyPerformance: [
    { day: 'Mon', resolved: 45, received: 52 },
    { day: 'Tue', resolved: 52, received: 48 },
    { day: 'Wed', resolved: 38, received: 40 },
    { day: 'Thu', resolved: 65, received: 72 },
    { day: 'Fri', resolved: 58, received: 60 },
    { day: 'Sat', resolved: 35, received: 38 },
    { day: 'Sun', resolved: 28, received: 55 },
  ],
  departmentPerformance: [
    { name: 'Roads', resolution: 92, response: 88, satisfaction: 90 },
    { name: 'Water', resolution: 85, response: 82, satisfaction: 87 },
    { name: 'Sanitation', resolution: 95, response: 91, satisfaction: 93 },
    { name: 'Electricity', resolution: 88, response: 85, satisfaction: 86 },
    { name: 'Traffic', resolution: 90, response: 87, satisfaction: 89 },
  ],
};

export const deadlinesData = [
  { id: 'C-1245', title: 'Road damage near MG Road', due: 'May 27, 2025', daysLeft: 5, priority: 'High' },
  { id: 'C-1251', title: 'Water pipe burst in downtown', due: 'May 24, 2025', daysLeft: 2, priority: 'Critical' },
  { id: 'C-1246', title: 'Water leakage in Block A', due: 'May 25, 2025', daysLeft: 3, priority: 'Medium' },
  { id: 'C-1250', title: 'Broken footpath near school', due: 'May 28, 2025', daysLeft: 6, priority: 'High' },
  { id: 'C-1248', title: 'Street light not working', due: 'May 26, 2025', daysLeft: 4, priority: 'Medium' },
];

