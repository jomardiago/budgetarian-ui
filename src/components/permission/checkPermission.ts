import { User } from '@/context/AuthContext';
import { CheckPermissionConfig, Roles } from './permission.types';

const permissionCheckTypeMethods = {
  'one-of': (roles: Roles) => roles.some,
  'all-of': (roles: Roles) => roles.every,
};

export const checkPermission = (user: User, roles: Roles, config: CheckPermissionConfig = {}) => {
  const { type = 'one-of', entityOwnerId, debug } = config;

  const checkMethod = permissionCheckTypeMethods?.[type] || permissionCheckTypeMethods['one-of'];

  const hasAccess = checkMethod(roles).bind(roles)((role) => {
    // Checks if user created a record
    if (role === 'owner') {
      return String(user?._id) === String(entityOwnerId);
    }

    // Checks if user is authenticated
    if (role === 'logged-in') {
      return Boolean(user?._id);
    }
  });

  debug &&
    console.log('PERMISSION_DEBUG', {
      hasAccess,
      requiredRoles: roles,
      type,
      entityOwnerId,
    });

  return hasAccess;
};
