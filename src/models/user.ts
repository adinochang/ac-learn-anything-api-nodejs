export interface UserRecord {
  userId: number;
  userName: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
}