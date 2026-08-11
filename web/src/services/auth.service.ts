import { authClient } from "@/lib/auth-client";

export class AuthService {
  async signup({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/",
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async login({ email, password }: { email: string; password: string }) {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async logout() {
    await authClient.signOut();
  }
}
