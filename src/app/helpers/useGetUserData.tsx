import { createClient } from "../utils/supabase/server";

export async function useGetUserData() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  return { data, error };
}
