/**
 * Role-Based Access Control (RBAC) Permission Definitions
 * 
 * Defines what each role can access across the application.
 * Roles: user (citizen), admin (department admin), super_admin (system admin)
 */

// Role hierarchy - higher index = more privileges
export const ROLE_HIERARCHY = {
  user: 0,
  admin: 1,
  super_admin: 2,
};

// Dashboard route mapping for each role
export const ROLE_DASHBOARDS = {
  user: '/dashboard',
  admin: '/admin/dashboard',
  super_admin: '/super-admin/dashboard',
};

// Feature-based permissions for granular access control
export const PERMISSIONS = {
  // Complaint management
  'complaints:view': ['user', 'admin', 'super_admin'],
  'complaints:create': ['user'],
  'complaints:assign': ['admin', 'super_admin'],
  'complaints:resolve': ['admin', 'super_admin'],
  'complaints:delete': ['super_admin'],
  'complaints:escalate': ['admin', 'super_admin'],

  // Department management
  'departments:view': ['admin', 'super_admin'],
  'departments:manage': ['super_admin'],

  // User/Officer management
  'users:view': ['admin', 'super_admin'],
  'users:manage': ['super_admin'],
  'officers:view': ['admin', 'super_admin'],
  'officers:manage': ['admin', 'super_admin'],

  // Analytics & Reports
  'analytics:view': ['admin', 'super_admin'],
  'reports:view': ['admin', 'super_admin'],
  'reports:generate': ['admin', 'super_admin'],
  'reports:export': ['admin', 'super_admin'],

  // System administration
  'system:settings': ['super_admin'],
  'system:audit-logs': ['super_admin'],
  'system:security': ['super_admin'],
  'system:health': ['super_admin'],
  'system:roles': ['super_admin'],

  // Notifications
  'notifications:view': ['user', 'admin', 'super_admin'],
  'notifications:send': ['admin', 'super_admin'],

  // Profile
  'profile:view': ['user', 'admin', 'super_admin'],
  'profile:edit': ['user', 'admin', 'super_admin'],
};

/**
 * Check if a user role has access to a specific permission
 * @param {string} role - The user's role (user, admin, super_admin)
 * @param {string} permission - The permission key to check
 * @returns {boolean} - Whether the role has access
 */
export const hasPermission = (role, permission) => {
  if (!role || !permission) return false;
  const allowedRoles = PERMISSIONS[permission];
  if (!allowedRoles) return false;
  return allowedRoles.includes(role);
};

/**
 * Check if a user role has access to multiple permissions (ALL required)
 * @param {string} role - The user's role
 * @param {string[]} permissions - Array of permission keys
 * @returns {boolean} - Whether the role has ALL permissions
 */
export const hasAllPermissions = (role, permissions) => {
  if (!role || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every((perm) => hasPermission(role, perm));
};

/**
 * Check if a user role has access to ANY of the given permissions
 * @param {string} role - The user's role
 * @param {string[]} permissions - Array of permission keys
 * @returns {boolean} - Whether the role has ANY permission
 */
export const hasAnyPermission = (role, permissions) => {
  if (!role || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some((perm) => hasPermission(role, perm));
};

/**
 * Get all permissions available for a given role
 * @param {string} role - The user's role
 * @returns {string[]} - Array of permission keys the role has access to
 */
export const getRolePermissions = (role) => {
  if (!role) return [];
  return Object.entries(PERMISSIONS)
    .filter(([, allowedRoles]) => allowedRoles.includes(role))
    .map(([permission]) => permission);
};

/**
 * Check if a role has higher or equal privileges compared to another role
 * @param {string} role - The role to check
 * @param {string} minimumRole - The minimum required role
 * @returns {boolean} - Whether the role meets the minimum requirement
 */
export const isAtLeastRole = (role, minimumRole) => {
  if (!role || !minimumRole) return false;
  const roleLevel = ROLE_HIERARCHY[role];
  const minLevel = ROLE_HIERARCHY[minimumRole];
  if (roleLevel === undefined || minLevel === undefined) return false;
  return roleLevel >= minLevel;
};

/**
 * Get the display name for a role
 * @param {string} role - The role key
 * @returns {string} - Human-readable role name
 */
export const getRoleDisplayName = (role) => {
  const NAMES = {
    user: 'Citizen',
    admin: 'Department Admin',
    super_admin: 'Super Administrator',
  };
  return NAMES[role] || role || 'Unknown';
};

/**
 * Get the dashboard route for a given role
 * @param {string} role - The user's role
 * @returns {string} - The dashboard route path
 */
export const getDashboardRoute = (role) => {
  return ROLE_DASHBOARDS[role] || '/login';
};

export default {
  ROLE_HIERARCHY,
  ROLE_DASHBOARDS,
  PERMISSIONS,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  getRolePermissions,
  isAtLeastRole,
  getRoleDisplayName,
  getDashboardRoute,
};
