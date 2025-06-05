import { supabase } from "../database/supabase";

export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, data, message: "User registered successfully" };
};

export const loginUser = async (user: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, data, message: "User logged in successfully" };
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, message: "User logged out successfully" };
};
