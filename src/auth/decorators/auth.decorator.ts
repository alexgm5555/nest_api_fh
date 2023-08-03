
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ValidRoles } from '../interfaces';
import { RoleProtector } from './role-protector.decorator';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtector(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}