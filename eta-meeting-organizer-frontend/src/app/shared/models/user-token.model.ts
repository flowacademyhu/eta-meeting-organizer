import { Role } from '~/app/models/user.model';

export interface UserToken {
  username: string;
  sub: string;
  iat: number;
  expr: number;
  role: Role;
  verified: boolean;
}
