export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthState {
  user: User | null;
  userToken: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isAuth: boolean;
}

export interface RegisterUserPayload extends LoginCredentials {
  first_name: string;
  last_name: string;
  confirm:string
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface RegisterData extends LoginCredentials {
  first_name: string;
  last_name: string;
  confirm:string
}

export interface EditDetailsData {
  first_name: string;
  last_name: string;
  email:string
}

export interface ApiError {
  message: string;
}