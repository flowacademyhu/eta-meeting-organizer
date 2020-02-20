export interface User {
  id: string;
  username: string;
  role: Role;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  verifiedByAdmin: boolean;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  READER = 'READER'
}
