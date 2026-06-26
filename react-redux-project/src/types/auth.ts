export type AuthUser = {
  username: string;
  email: string;
};

export type AuthState = {
  user: AuthUser | null;
};

export type AuthFormValues = {
  username: string;
  email: string;
  password: string;
};

export type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;