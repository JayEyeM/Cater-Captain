// src/auth.tsx

import { supabase } from './supabaseClient';
import { AuthError, AuthResponse } from '@supabase/supabase-js';

export const signUp = async (email: string, password: string): Promise<{ user: object | null, error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { user: data.user, error };
};

export const signIn = async (email: string, password: string): Promise<{ user: object | null, error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error };
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
