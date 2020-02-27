export interface User {
  id: string;
  username: string;
  role: Role;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  READER = 'READER',
  PENDING = 'PENDING'
}
