
export enum UserRole {
  ADMIN = 'ADMIN',
  PENELITI = 'PENELITI',
  TEKNISI = 'TEKNISI',
  VIEWER = 'VIEWER'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  password?: string;
}

export interface Sensor {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'warning';
  lastRead: number;
  battery: number;
  lastUpdate: string;
}
