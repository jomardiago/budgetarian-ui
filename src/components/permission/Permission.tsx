import { AuthContext, User } from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { checkPermission } from './checkPermission';
import { PermissionType, Debug, EntityOwnerId, Roles } from './permission.types';

export type PermissionProps = {
  children: React.ReactElement;
  noAccess?: React.ReactElement | ((args: { user: User | undefined; hasAccess: boolean }) => React.ReactElement);
  roles: Roles;
  type?: PermissionType;
  entityOwnerId?: EntityOwnerId;
  debug?: Debug;
};

const Permission = (props: PermissionProps) => {
  const { children, noAccess, entityOwnerId, roles = [], type = 'one-of', debug = false } = props;
  const { user } = useContext(AuthContext);
  const [hasAccess, setHasAccess] = useState(
    user
      ? checkPermission(user, roles, {
          type,
          entityOwnerId,
          debug,
        })
      : false
  );

  useEffect(() => {
    if (!user) {
      setHasAccess(false);
      return;
    }
    const doesHaveAccess = checkPermission(user, roles, {
      type,
      entityOwnerId,
      debug,
    });
    setHasAccess(doesHaveAccess);
  }, [user?._id, entityOwnerId, roles, type]);

  const renderNoAccess = () => {
    if (typeof noAccess === 'function') {
      return noAccess({
        user,
        hasAccess,
      });
    }
    return noAccess;
  };

  return hasAccess ? children : renderNoAccess() || null;
};

export default Permission;
