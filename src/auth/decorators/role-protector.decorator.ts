import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles'

export const RoleProtector = (...args: ValidRoles[]) => {

  return SetMetadata(META_ROLES, args)
};
