export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface SignupPayload {
  email: string;
  role?: string;
  firstName: string;
  lastName?: string;
  middleName?: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}